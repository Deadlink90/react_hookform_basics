import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { BsExclamationTriangleFill } from "react-icons/bs";
import { DevTool } from "@hookform/devtools";

const Part2 = () => {
  const request = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users/2");
    const data = await res.json();
    return {
      username: "batman",
      email: data.email,
      channel: "",
    };
  };

  const {
    register,
    control,
    trigger,
    handleSubmit,
    watch,
    getValues,
    setValue,
    reset,
    formState: {
      errors,
      touchedFields,
      dirtyFields,
      isDirty,
      isValid,
      isSubmitting,
      isSubmitted,
      isSubmitSuccessful,
      submitCount,
    },
  } = useForm({
    defaultValues: {
      username: "username",
      email: "email@gmail.com",
      channel: "channel",
      social: {
        twitter: "twittter",
        facebook: "facebook",
      },
      phoneNumbers: ["3333333333", "3333333333"],
      phNumbers: [{ number: "3333333333" }],
      age: 2,
      dob: new Date(),
    },
    mode: "onSubmit",
  });

  console.log(errors);

  const { fields, append, remove } = useFieldArray({
    name: "phNumbers",
    control,
  });

  const sendForm = (values) => {
    console.log(values);
  };

  const onError = (errors) => {
    console.log("errors:", errors);
  };

  //obtain values without sending form
  const handleGetValues = () => {
    //obtain all values
    // console.log("get values", getValues());

    //obtain especific values
    // console.log("get values", getValues("social") );

    //obtain multiple values
    console.log("get values", getValues(["username", "channel"]));
  };

  const handleSetValues = () => {
    //by default "setValue" doesn't affect input properties
    //like dirty or touch, validation rules are not applied either
    // setValue("username","deadLink123");

    //if we want "setValue" method to affect properties before mentioned
    //we must use a configuration object as third parameter
    setValue("username", "", {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const watchInput = watch("username");

  return (
        
          <div className="card mb-4">
            <div className="card-header d-flex justify-content-between align-items-center">
              Form-Hook-Extended
              <div
                className="btn-group"
                role="group"
                aria-label="Basic example"
              >
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={handleSetValues}
                >
                  Set Value
                </button>
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => reset()}
                >
                  Reset Form
                </button>
                <button
                  className="btn btn-sm btn-outline-primary"
                  //trigger all validations onClick={() => trigger()}
                  onClick={() => trigger("channel")}
                >
                Trigger
                </button>
              </div>
            </div>
            <div className="card-body">
              <form className="mt-2" onSubmit={handleSubmit(sendForm, onError)}>
                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-2">
                      <label className="form-label" htmlFor="username">
                        Username
                      </label>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        className={`form-control ${
                          errors.username ? "is-invalid" : ""
                        }`}
                        placeholder="username"
                        {...register("username", {
                          required: {
                            value: true,
                            message: "This field is required",
                          },
                        })}
                      />
                      {errors.username && (
                        <small className="form-text text-danger d-flex align-items-center">
                          <BsExclamationTriangleFill className="mx-1" />
                          {errors.username.message}
                        </small>
                      )}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-2">
                      <label className="form-label" htmlFor="email">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className={`form-control ${
                          errors.email ? "is-invalid" : ""
                        }`}
                        placeholder="email"
                        {...register("email", {
                          required: {
                            value: true,
                            message: "This field is required",
                          },
                          validate: {
                            emailAvailable: async (fieldValue) => {
                              const res = await fetch(
                                `https://jsonplaceholder.typicode.com/users?email=${fieldValue}`
                              );
                              const data = await res.json();
                              return (
                                data.length === 0 || "Email already exists"
                              );
                            },
                          },
                        })}
                      />
                      {errors.email && (
                        <small className="form-text text-danger d-flex align-items-center">
                          <BsExclamationTriangleFill className="mx-1" />
                          {errors.email.message}
                        </small>
                      )}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-2">
                      <label className="form-label" htmlFor="channel">
                        Channel
                      </label>
                      <input
                        type="text"
                        id="channel"
                        name="channel"
                        placeholder="channel"
                        className={`form-control ${
                          errors.email ? "is-invalid" : ""
                        }`}
                        {...register("channel", {
                          required: {
                            value: true,
                            message: "This field is required",
                          },
                        })}
                      />
                      {errors.channel && (
                        <small className="form-text text-danger d-flex align-items-center">
                          <BsExclamationTriangleFill className="mx-1" />
                          {errors.channel.message}
                        </small>
                      )}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-2">
                      <label className="form-label" htmlFor="facebook">
                        Facebook
                      </label>
                      <input
                        type="text"
                        id="facebook"
                        name="facebook"
                        placeholder="Facebook"
                        className={`form-control ${
                          errors.social?.facebook ? "is-invalid" : ""
                        }`}
                        {...register("social.facebook", {
                          required: {
                            value: true,
                            message: "This field is required",
                          },
                        })}
                      />
                      {errors.social?.facebook && (
                        <small className="form-text text-danger d-flex align-items-center">
                          <BsExclamationTriangleFill className="mx-1" />
                          {errors.social?.facebook?.message}
                        </small>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-2">
                      <label className="form-label" htmlFor="twitter">
                        Twitter
                      </label>
                      <input
                        type="text"
                        id="twitter"
                        name="twitter"
                        placeholder="Twitter"
                        className={`form-control ${
                          errors.social?.twitter ? "is-invalid" : ""
                        }`}
                        {...register("social.twitter", {
                          disabled: watch("channel") === "",
                          required: {
                            value: true,
                            message: "This field is required",
                          },
                        })}
                      />
                      {errors.social?.twitter && (
                        <small className="form-text text-danger d-flex align-items-center">
                          <BsExclamationTriangleFill className="mx-1" />
                          {errors.social?.twitter?.message}
                        </small>
                      )}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="mb-2">
                    <label className="form-label" htmlFor="primary-phone">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="primary-phone"
                      name="primary-phone"
                      placeholder="#"
                      className={`form-control ${
                        errors.phoneNumbers?.[0] ? "is-invalid" : ""
                      }`}
                      {...register("phoneNumbers.0", {
                        required: {
                          value: true,
                          message: "this field is required [0] ",
                        },
                      })}
                    />
                    {errors.phoneNumbers?.[0] && (
                      <small className="form-text text-danger d-flex align-items-center">
                        <BsExclamationTriangleFill className="mx-1" />
                        {errors.phoneNumbers?.[0].message}
                      </small>
                    )}
                  </div>
                  <div className="mb-2">
                    <label className="form-label" htmlFor="secondary-phone">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="secondary-phone"
                      name="secondary-phone"
                      placeholder="#"
                      className={`form-control ${
                        errors.phoneNumbers?.[1] ? "is-invalid" : ""
                      }`}
                      {...register("phoneNumbers.1", {
                        required: {
                          value: true,
                          message: "This field is required [1]",
                        },
                      })}
                    />
                    {errors.phoneNumbers?.[1] && (
                      <small className="form-text text-danger d-flex align-items-center">
                        <BsExclamationTriangleFill className="mx-1" />
                        {errors.phoneNumbers?.[1].message}
                      </small>
                    )}
                  </div>
                </div>

                <div className="row">
                  <div className="d-flex justify-content-between align-items-center">
                    <label className="form-label">PhNumber</label>

                    <button
                      className="btn btn-link"
                      type="button"
                      onClick={() => append({ number: "" })}
                    >
                      Add Number
                    </button>
                  </div>
                  {fields.map((field, index) => (
                    <div className="col-12" key={field.id}>
                      <input
                        type="text"
                        className={`form-control mb-2 ${
                          errors?.phNumbers?.[index]?.number ? "is-invalid" : ""
                        }`}
                        {...register(`phNumbers.${index}.number`, {
                          required: {
                            value: true,
                            message: `This field is required [${index}]`,
                          },
                        })}
                      />
                      <div className="d-flex justify-content-between align-items-center">
                        {errors?.phNumbers?.[index]?.number && (
                          <small className="form-text text-danger d-flex align-items-center">
                            <BsExclamationTriangleFill className="mx-1" />
                            {errors?.phNumbers?.[index]?.number?.message}
                          </small>
                        )}

                        {fields.length > 1 && (
                          <button
                            className="btn btn-link text-danger"
                            type="button"
                            onClick={() => remove(index)}
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-2">
                      <label className="form-label" htmlFor="age">
                        Age
                      </label>
                      <input
                        type="number"
                        id="age"
                        name="age"
                        className={`form-control ${
                          errors.age ? "is-invalid" : ""
                        }`}
                        placeholder="age"
                        {...register("age", {
                          valueAsNumber: true,
                          required: {
                            value: true,
                            message: "This field is required",
                          },
                        })}
                      />
                      {errors.age && (
                        <small className="form-text text-danger d-flex align-items-center">
                          <BsExclamationTriangleFill className="mx-1" />
                          {errors.age.message}
                        </small>
                      )}
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-2">
                      <label className="form-label" htmlFor="dob">
                        Date
                      </label>
                      <input
                        type="date"
                        id="dob"
                        name="dob"
                        className={`form-control ${
                          errors.date ? "is-invalid" : ""
                        }`}
                        placeholder="dob"
                        {...register("dob", {
                          valueAsDate: true,
                          required: {
                            value: true,
                            message: "This field is required",
                          },
                        })}
                      />
                      {errors.dob && (
                        <small className="form-text text-danger d-flex align-items-center">
                          <BsExclamationTriangleFill className="mx-1" />
                          {errors.dob.message}
                        </small>
                      )}
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center mt-2">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleGetValues}
                  >
                    Get Values
                  </button>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={!isDirty || isSubmitting}
                  >
                    {isSubmitting ? <span>Sending...</span> : <span>Send</span>}
                  </button>
                </div>
            <DevTool control={control} />
              </form>
            </div>
          </div>
  );
};

export default Part2;
