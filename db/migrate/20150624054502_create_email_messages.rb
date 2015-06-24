class CreateEmailMessages < ActiveRecord::Migration
  def change
    create_table :email_messages do |t|
      t.string :from
      t.string :to
      t.string :subject
      t.string :body
      t.references :inbox
      t.timestamps null: false
    end
  end
end
