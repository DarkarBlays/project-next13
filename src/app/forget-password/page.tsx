"use client"

import { Form } from "@/components/Form";
import { useAuthFetch } from "@/hooks/useAuthFetch";
import { useLoading } from "@/hooks/useLoading";

export default function LoginPage() {
  const {finishLoading, isLoading, startLoading} = useLoading()
  const AuthFetch = useAuthFetch()

  const forgetPassword = async (formData: any) => {
    startLoading()
    await AuthFetch({
      endpoint: 'forget-password',
      formData
    })
    finishLoading()
  }

  return (
    <>
      <Form
        title="Recuperar contraseña" 
        onSubmit={forgetPassword}
        description="Formulario para recuperar contraseña"
      >
        <div className="my-[10px] flex flex-col gap-4">
        <Form.Input
            label="Correo"
            name="email"
            placeholder="Ingresa tu correo..."
        />
        </div>
        <Form.SubmitButton buttonText="Recuperar Contraseña" isLoading={isLoading}/>
          <Form.Footer
            description="Volver al inicio"
            link="/"
            textLink="Inicio"
          />
      </Form>
    </>
  );
}