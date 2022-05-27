import React, { useState } from "react";
import { Field, useField } from "formik";
import { Form, InputGroup } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";

export const FormTextField = ({
  as,
  md,
  controlId,
  label,
  name,
  type = "text",
  className,
  placeholder,
  style,
  outlined,
  textarea = false,
  inputGroupPrepend = null,
  helperText,
  ...props
}) => {
  return (
    <Field
      name={name}
      render={({ field, form }) => {
        const isValid = !form.errors[field.name];
        const isInvalid = form.touched[field.name] && !isValid;
        return (
          <Form.Group
            className={className}
            as={as}
            md={md}
            controlId={controlId}
          >
            <Form.Label>{label}</Form.Label>
            <InputGroup>
              {inputGroupPrepend}
              <Form.Control
                {...field}
                type={type}
                as={textarea ? "textarea" : "input"}
                isValid={form.touched[field.name] && isValid}
                isInvalid={isInvalid}
                feedback={form.errors[field.name]}
                className={`border-end ${outlined && "text-white"} ${
                  isInvalid && "border-danger"
                } ${form.touched[field.name] && "border-success"}`}
                placeholder={placeholder}
                style={{
                  ...style,
                  borderTopRightRadius: ".5rem",
                  borderBottomRightRadius: ".5rem",
                }}
                {...props}
              />
              <Form.Control.Feedback type="invalid">
                {form.errors[field.name]}
              </Form.Control.Feedback>
            </InputGroup>
            {helperText}
          </Form.Group>
        );
      }}
    />
  );
};

export const FormSelectField = ({
  as,
  md,
  controlId,
  label,
  name,
  className,
  type = "select",
  inputGroupPrepend = null,
  children,
  ...props
}) => {
  return (
    <Field
      name={name}
      render={({ field, form }) => {
        const isValid = !form.errors[field.name];
        const isInvalid = form.touched[field.name] && !isValid;

        return (
          <Form.Group
            as={as}
            md={md}
            controlId={controlId}
            className={className}
          >
            <Form.Label>{label}</Form.Label>
            <InputGroup>
              {inputGroupPrepend}
              <Form.Control
                {...field}
                type={type}
                isValid={form.touched[field.name] && isValid}
                isInvalid={isInvalid}
                feedback={form.errors[field.name]}
                as="select"
                className="border-end"
                {...props}
                style={{
                  borderTopRightRadius: ".5rem",
                  borderBottomRightRadius: ".5rem",
                }}
              >
                {children}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {form.errors[field.name]}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        );
      }}
    />
  );
};

export const FormCheckbox = ({ name, label, errors, className, ...props }) => {
  return (
    <Form.Group className={className} style={{ whiteSpace: "nowrap" }}>
      <Form.Check
        required
        name={name}
        type="checkbox"
        label={label}
        isInvalid={!!errors}
        feedback={errors}
        {...props}
      />
    </Form.Group>
  );
};

export const FormAutoCompleteField = (props) => {
  const [, meta, helper] = useField(props);
  const [selections, setSelections] = useState(
    props.defaultSelected ? props.defaultSelected : []
  );
  return (
    <>
      <Form.Group controlId={`form-${props.name}`}>
        <Form.Label>{props.label}</Form.Label>
        <Typeahead
          id={props.name}
          multiple={false}
          onChange={(selected) => {
            const value = selected.length > 0 ? selected[0].id : "";
            helper.setValue(value);
            setSelections(selected);
            props.multiple && props.setFieldValue(props.name, selected);
          }}
          selected={props.multiple ? selections : ""}
          onInputChange={(text) => helper.setValue(text)}
          onBlur={() => helper.setTouched(true)}
          labelKey={(options) => options.name}
          options={props.options}
          {...(meta.touched &&
            (meta.error
              ? { isInvalid: true, className: "is-invalid" }
              : { isValid: true }))}
          {...props}
        />
        {meta.touched && meta.error ? (
          <div className="invalid-feedback">{meta.error}</div>
        ) : null}
      </Form.Group>
    </>
  );
};
