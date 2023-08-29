import { useForm } from "react-hook-form";

const Part1 = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm({
    defaultValues: { nombre: "juan" },
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    console.log(data.nombre);

    alert("Enviando datos...");

    reset();
  });

  return (
    <form onSubmit={onSubmit}>
      {/* Nombre */}
      <div>
        <label htmlFor="nombre">Nombre</label>
        <input
          type="text"
          name="nombre"
          id="nombre"
          {...register("nombre", {
            required: {
              value: true,
              message: "Ingresa el nombre",
            },
            minLength: {
              value: 2,
              message: "Ingresa al menos dos caracteres",
            },
            maxLength: {
              value: 10,
              message: "Maximo 10 caracteres",
            },
          })}
        />
        {errors.nombre && <span> {errors.nombre.message} </span>}
      </div>

      {/* Correo*/}
      <div>
        <label htmlFor="correo">Correo</label>
        <input
          type="email"
          id="correo"
          name="correo"
          {...register("correo", {
            required: {
              value: true,
              message: "Ingresa el correo",
            },

            pattern: {
              value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/,
              message: "Correo no valido",
            },
          })}
        />
        {errors.correo && <span> {errors.correo.message} </span>}
      </div>

      {/* Contraseña */}
      <div>
        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          name="password"
          id="password"
          {...register("password", {
            required: {
              value: true,
              message: "Ingrese la contraseña",
            },
          })}
        />
        {errors.password && <span> {errors.password.message} </span>}
      </div>

      {/* Repetir contraseña */}
      <div>
        <label htmlFor="confirmPassword">Confirmar contraseña</label>
        <input
          type="password"
          {...register("confirmPassword", {
            required: {
              value: true,
              message: "Confirma la contraseña",
            },
            validate: (value) => {
              if (value === watch("password")) {
                return true;
              } else {
                return "Las contraseñas no coinciden";
              }
            },
          })}
        />
        {errors.confirmPassword && (
          <span> {errors.confirmPassword.message} </span>
        )}
      </div>

      {/* Fecha de nacimiento */}
      <div>
        <label htmlFor="birthday">Fecha de nacimiento</label>
        <input
          type="date"
          name="birthday"
          id="birthday"
          {...register("birthday", {
            required: {
              value: true,
              message: "Ingrese la fecha",
            },
            validate: (value) => {
              const fechaNacimiento = new Date(value);
              const fechaActual = new Date();
              const edad =
                fechaActual.getFullYear() - fechaNacimiento.getFullYear();
              console.log(edad);
              if (edad >= 18) {
                return true;
              } else {
                return "Debes ser mayor de edad";
              }
            },
          })}
        />
        {errors.birthday && <span> {errors.birthday.message} </span>}
      </div>

      {/* Pais */}
      <div>
        <label htmlFor="country">Pais</label>
        <select name="country" id="country" {...register("country")}>
          <option value="mx">Mexico</option>
          <option value="co">Colombia</option>
          <option value="ar">Argentina</option>
        </select>
        {errors.country && <span> {errors.country.message} </span>}
      </div>

      {watch("country") === "ar" && (
        <div>
          <input
            type="text"
            placeholder="provincia"
            {...register("provincia", {
              required: {
                value: true,
                message: "Ingrese la provincia",
              },
            })}
          />
          {errors.provincia && <span> {errors.provincia.message} </span>}
        </div>
      )}

      {/* Foto */}
      <div>
        <label htmlFor="file">Foto</label>
        <input
          type="file"
          name="file"
          id="file"
          onChange={(e) => {
            console.log(e.target.files[0]);
            setValue("foto", e.target.files[0].name);
          }}
        />
      </div>

      {/* Terminos y condiciones */}
      <div>
        <label htmlFor="terms">Terminos y condiciones</label>
        <input
          type="checkbox"
          name="terms"
          id="terms"
          {...register("terms", {
            required: {
              value: true,
              message: "Debes aceptar los terminos y condiciones",
            },
          })}
        />
        {errors.terms && <span> {errors.terms.message} </span>}
      </div>

      <button type="submit">Enviar</button>

      <pre>{JSON.stringify(watch(), null, 2)}</pre>
    </form>
  );
};

export default Part1;
