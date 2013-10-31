class CreateUsers < ActiveRecord::Migration
  def up
    create_table :users do |t|
      t.text :username
      t.text :salt
      t.text :identifier
      t.text :password
      t.timestamps
    end
  end

  def down
    drop_table :users
  end
end
