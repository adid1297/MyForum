from marshmallow import Schema, fields


class NewUserInputSchema(Schema):
    name = fields.Str(required=True)
    email = fields.Email(required=True)
    password = fields.Str(required=True, min=8)


class UserSchema(Schema):
    id = fields.Str(attribute="user_id")
    name = fields.Str(attribute="user_name")
    email = fields.Email()
    created_at = fields.DateTime(attribute="date_created")
    updated_at = fields.DateTime(attribute="date_updated")
    removed_at = fields.DateTime(attribute="date_removed")


class UserLoginSchema(Schema):
    email = fields.Email(required=True)
    password = fields.Str(required=True, min=8)
