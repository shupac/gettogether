require 'sinatra'
require "sinatra/reloader" if development?
require 'active_record'
require 'digest/sha1'
require 'pry'
require 'uri'
require 'open-uri'
require 'bcrypt'
# require 'nokogiri'

###########################################################
# Configuration
###########################################################

set :public_folder, File.dirname(__FILE__) + '/public'

configure :development, :production do
  ActiveRecord::Base.establish_connection(
    :adapter => 'sqlite3',
    :database =>  'db/dev.sqlite3.db'
   )
end

# Handle potential connection pool timeout issues
after do
  ActiveRecord::Base.connection.close
end

# turn off root element rendering in JSON
ActiveRecord::Base.include_root_in_json = false

###########################################################
# Models
###########################################################
# Models to Access the database through ActiveRecord.
# Define associations here if need be
# http://guides.rubyonrails.org/association_basics.html

class User < ActiveRecord::Base
  attr_accessible :username, :identifier, :password, :salt

  validates :password, presence: true

  before_save do |record|
    record.identifier = Digest::SHA1.hexdigest(username)
  end
end

###########################################################
# Authentication
###########################################################

enable :sessions

post "/signup" do
  data = JSON.parse(request.body.read)
  username = data['username']
  password = data['password']
  password_salt = BCrypt::Engine.generate_salt
  password_hash = BCrypt::Engine.hash_secret(password, password_salt)
  if User.find_by_username(username)
    {success: false, message: 'Username already exists'}.to_json
  else
    user = User.create(username: username, salt: password_salt, password: password_hash)
    {success: true, id: user.identifier}.to_json
  end
end

post "/login" do
  data = JSON.parse(request.body.read)
  username = data['username']
  password = data['password']
  p 'login', username, password
  user = User.find_by_username(username)
  if user != nil
    password_hash = BCrypt::Engine.hash_secret(password, user[:salt])
    if user[:password] == password_hash
      {success: true, id: user.identifier}.to_json
    else
      {success: false, message: 'Incorrect username or password'}.to_json
    end
  else
    p 'login: user not found'
    {success: false, message: 'User not found'}.to_json
  end
end

###########################################################
# Routes
###########################################################

get "/" do
  redirect '/index.html'
end

get '/signup' do
  redirect '/index.html'
end

get '/login' do
  redirect '/index.html'
end

###########################################################
# Utility
###########################################################

def read_url_head url
  head = ""
  url.open do |u|
    begin
      line = u.gets
      next  if line.nil?
      head += line
      break if line =~ /<\/head>/
    end until u.eof?
  end
  head + "</html>"
end

def get_url_title url
  # Nokogiri::HTML.parse( read_url_head url ).title
  result = read_url_head(url).match(/<title>(.*)<\/title>/)
  result.nil? ? "" : result[1]
end
