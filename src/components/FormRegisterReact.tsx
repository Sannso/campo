import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { registerSchema, mappedTypes } from "../validations/registerSchema";
import { useState } from "react";

type Inputs = {
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPass: string;
  cellphone: string;
  type: string;
};

export function RegisterForm(props: any) {
  const {
    register,
    handleSubmit,
    //watch, ver en tiempo real el cambio
    formState: { errors },
  } = useForm<Inputs>({ resolver: zodResolver(registerSchema) });

  const [response, setResponse] = useState<boolean | undefined>(undefined);

  const mytypes = Object.entries(mappedTypes).map(([key, value]) => (
    <option className="font-semibold rounded-lg" value={key} key={key}>
      {value}
    </option>
  ));

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const res = await fetch("/api/registerDB.json", {
      method: "POST",
      body: JSON.stringify(data),
    });
    const { message } = await res.json();
    message == "Success" ? setResponse(true) : setResponse(false);
  };

  return (
    <section className="flex flex-col gap-5">
      {response && props.modal}
      {(response != undefined)&&(response == false) && <p className="font-bold text-red-600 text-center">Este correo ya esta registrado, intente con otro, o inicie sesion</p>}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center font-semibold gap-6 mt-10 text-white [&>label>p]:text-red-500 [&>label>input]:mt-1 [&>label>input]:rounded-lg
   [&>label>input]:text-black [&>label>input]:font-semibold [&>label>input]:px-1.5 [&>label>input]:py-0.5"
      >
        <label className="flex flex-col">
          Nombre:
          <input type="text" {...register("name")} />
          {errors.name?.message && (
            <p className="text-red font-semibold">{errors.name.message}</p>
          )}
        </label>

        <label className="flex flex-col">
          Primer Apellido:
          <input type="text" {...register("firstName")} />
          {errors.firstName?.message && (
            <p className="text-red font-semibold">{errors.firstName.message}</p>
          )}
        </label>

        <label className="flex flex-col">
          Segundo Apellido:
          <input type="text" {...register("lastName")} />
          {errors.lastName?.message && (
            <p className="text-red font-semibold">{errors.lastName.message}</p>
          )}
        </label>

        <label className="flex flex-col">
          Correo:
          <input type="email" {...register("email")} />
          {errors.email?.message && (
            <p className="text-red font-semibold">{errors.email.message}</p>
          )}
        </label>

        <label className="flex flex-col">
          Contraseña:
          <input type="password" {...register("password")} />
          {errors.password?.message && (
            <p className="text-red font-semibold">{errors.password.message}</p>
          )}
        </label>

        <label className="flex flex-col">
          Confirmar Contraseña:
          <input type="password" {...register("confirmPass")} />
          {errors.confirmPass?.message && (
            <p className="text-red font-semibold">
              {errors.confirmPass.message}
            </p>
          )}
        </label>

        <label className="flex flex-col">
          Numero de Celular:
          <input type="number" {...register("cellphone")} />
          {errors.cellphone?.message && (
            <p className="text-red font-semibold">{errors.cellphone.message}</p>
          )}
        </label>

        <label className="flex flex-col gap-1">
          Que es usted?:
          <select
            className="rounded-lg text-black font-semibold px-0.5 py-0.5 focus:text-white focus:bg-slate-700"
            id="type"
            {...register("type")}
          >
            {mytypes}
          </select>
          {errors.type?.message && (
            <p className="text-red font-semibold">{errors.type.message}</p>
          )}
        </label>

        <section className="flex gap-3">
          <button
            type="submit"
            className="bg-blue-500 px-2 py-1 rounded-xl font-bold"
          >
            Registrarse
          </button>
        </section>
      </form>
    </section>
  );
}
