from marshmallow import Schema, fields, validate


class NewUserInputSchema(Schema):
    name = fields.Str(required=True, validate=validate.Length(min=1))
    email = fields.Email(required=True, validate=validate.Length(min=1))
    password = fields.Str(required=True, validate=validate.Length(min=8))


class UserSchema(Schema):
    id = fields.Str(attribute="user_id")
    name = fields.Str(attribute="user_name")
    email = fields.Email()
    created_at = fields.DateTime(attribute="date_created")
    updated_at = fields.DateTime(attribute="date_updated")
    removed_at = fields.DateTime(attribute="date_removed")


class UserLoginSchema(Schema):
    email = fields.Email(required=True)
    password = fields.Str(required=True, validate=validate.Length(min=8))
