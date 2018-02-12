class IdeaSerializer < ActiveModel::Serializer
  attributes :id, :description, :user_id, :do_it, :dont_do_it, :outcome, :good, :url
end
