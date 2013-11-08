# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20131108003636) do

  create_table "answers", :force => true do |t|
    t.string   "body",                      :null => false
    t.integer  "poll_id",                   :null => false
    t.integer  "count",      :default => 0, :null => false
    t.datetime "created_at",                :null => false
    t.datetime "updated_at",                :null => false
  end

  add_index "answers", ["poll_id"], :name => "index_answers_on_poll_id"

  create_table "polls", :force => true do |t|
    t.string   "question",                     :null => false
    t.string   "poll_type",                    :null => false
    t.boolean  "open",       :default => true, :null => false
    t.integer  "user_id",                      :null => false
    t.datetime "created_at",                   :null => false
    t.datetime "updated_at",                   :null => false
  end

  add_index "polls", ["open"], :name => "index_polls_on_open"
  add_index "polls", ["question"], :name => "index_polls_on_question"
  add_index "polls", ["user_id"], :name => "index_polls_on_user_id"

  create_table "users", :force => true do |t|
    t.string   "username",        :null => false
    t.string   "password_digest", :null => false
    t.string   "session_token",   :null => false
    t.datetime "created_at",      :null => false
    t.datetime "updated_at",      :null => false
  end

  add_index "users", ["session_token"], :name => "index_users_on_session_token", :unique => true
  add_index "users", ["username"], :name => "index_users_on_username", :unique => true

  create_table "votes", :force => true do |t|
    t.string   "msg"
    t.string   "from"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

end
