from marshmallow import Schema, fields, pre_load


class TopicInputSchema(Schema):
    token = fields.Str(required=True)
    subject = fields.Str(required=True)
    description = fields.Str(required=True)


class TopicSchema(Schema):
    id = fields.Str(attribute=topic_id)
    subject = fields.Str()
    description = fields.Str()
    created_at = fields.DateTime(attribute="date_created")
    created_by = fields.DateTime()
    updated_at = fields.DateTime()
    updated_by = fields.DateTime()


class TopicMessageInputSchema(Schema):
    token = fields.Str(required=True)
    message = fields.Str(required=True)


class TopicMessageSchema(Schema):
    id = fields.Str(attribute=topic_message_id)
    topic_id = fields.Str(attribute=topic_id)
    message = fields.Str()
    created_at = fields.DateTime(attribute="date_created")
    created_by = fields.DateTime()
    updated_at = fields.DateTime()
    updated_by = fields.DateTime()
