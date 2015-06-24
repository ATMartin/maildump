class CreateInboxes < ActiveRecord::Migration
  def change
    create_table :inboxes do |t|
      t.string :slug
      t.timestamps null: false
    end
  end
end
