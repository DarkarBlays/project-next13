"use client"

import { Form } from "@/components/Form";
import { useAuthFetch } from "@/hooks/useAuthFetch";
import { useLoading } from "@/hooks/useLoading";

export default function LoginPage() {
  const {finishLoading, isLoading, startLoading} = useLoading()
  const AuthFetch = useAuthFetch()

  const register = async (formData: any) => {
    startLoading()
    await AuthFetch({
      endpoint: 'register',
      redirectRoute: '/home',
      formData
    })
    finishLoading()
  }

  return (
    <>
      <Form
        title="Registrate" 
        onSubmit={register}
        description="Formulario de registro de usuario"
      >
        <div className="my-[10px] flex flex-col gap-4">
        <Form.Input
            label="Correo"
            name="email"
            placeholder="Ingresa tu correo..."
        />
        <Form.Input
            label="Contraseña"
            name="password"
            placeholder="Ingresa tu contraseña..."
            type="password"
        />
        <Form.Input
            label="Contraseña"
            name="confirmPassword"
            placeholder="Repite tu contraseña..."
            type="password"
        />
        </div>
        <Form.SubmitButton buttonText="Crear cuenta" isLoading={isLoading}/>
          <Form.Footer
            description="Ya tienes una cuenta?"
            link="/login"
            textLink="Inicia Sesión"
          />
      </Form>
    </>
  );
}