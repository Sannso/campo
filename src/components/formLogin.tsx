export function FormLogin() {
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const { mail, password } = Object.fromEntries(new window.FormData(event.target));
    console.log("Mail y contrasena: ", mail, password)
  };

  return (
    <form
      className="form mt-10 flex flex-col items-center justify-center gap-4"
      onSubmit={handleSubmit}
    >
      <article className="flex flex-col gap-1">
        <label htmlFor="mail" className="text-white ml-1">
          Ingresar Correo
        </label>
        <input
          id="mail"
          name="mail"
          className="rounded-md h-8 w-50 text-black p-1"
          type="text"
        />
      </article>

      <article className="flex flex-col gap-1">
        <label htmlFor="password" className="text-white ml-1">
          Ingresar Contraseña
        </label>
        <input
          id="password"
          name="password"
          className="rounded-md h-8 w-50 text-black p-1"
          autoComplete="on"
          type="password"
        />
      </article>

      <button
        type="submit"
        className="bg-blue-500 rounded-full h-8 px-3 mt-5 hover:bg-blue-700 text-white"
      >
        Ingresar
      </button>
    </form>
  );
}
