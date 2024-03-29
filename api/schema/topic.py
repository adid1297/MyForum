from marshmallow import Schema, fields, pre_load, validate


class TopicInputSchema(Schema):
    subject = fields.Str(validate=validate.Length(min=1))
    description = fields.Str(validate=validate.Length(min=1))


class TopicSchema(Schema):
    id = fields.Str(attribute="topic_id")
    subject = fields.Str(attribute="topic_subject")
    description = fields.Str(attribute="topic_description")
    created_at = fields.DateTime(attribute="date_created")
    created_by = fields.Str()
    creator_user_name = fields.Str()
    updated_at = fields.DateTime(attribute="date_updated")
    updated_by = fields.Str()
    updator_user_name = fields.Str()


class TopicMessageInputSchema(Schema):
    message = fields.Str(validate=validate.Length(min=1))


class TopicMessageSchema(Schema):
    id = fields.Str(attribute="topic_message_id")
    topic_id = fields.Str(attribute="topic_id")
    message = fields.Str(attribute="topic_message")
    created_at = fields.DateTime(attribute="date_created")
    created_by = fields.Str()
    creator_user_name = fields.Str()
    updated_at = fields.DateTime(attribute="date_updated")
    updated_by = fields.Str()
    updator_user_name = fields.Str()
