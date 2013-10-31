# Rakefile -- this describes a set of commands
# that can be run from the commandline and
# declare dependencies between tasks.

require "./gettogether"
require 'rspec/core/rake_task'
require "sinatra/activerecord/rake"

# the default task, called from the command
# line with no arguments.

namespace :db do
   task :environment do
        ActiveRecord::Base.establish_connection :adapter => 'sqlite3', :database =>  'db/dev.sqlite3.db'
   end

   # :migrate task depends on :environment task
   # before :migrate runs, rake first runs all its
   # dependent tasks (i.e. :environment)
   #
   # in this case we must first create the database
   # and establish a connection before we migrate it.
   desc "Migrate the database"
   task(:migrate => :environment) do
        ActiveRecord::Migration.verbose = true
        ActiveRecord::Migrator.migrate("db/migrate")
   end

   desc 'Reset the database'
   task :reset, :env do |t, args|
        ActiveRecord::Base.establish_connection :adapter => 'sqlite3', :database =>  "db/#{args[:env]}.sqlite3.db"
        ActiveRecord::Migration.verbose = true
        ActiveRecord::Migrator.down('db/migrate')
        ActiveRecord::Migrator.migrate('db/migrate')
   end
end
