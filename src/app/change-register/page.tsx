"use client"

import { Form } from "@/components/Form";
import { useAuthFetch } from "@/hooks/useAuthFetch";
import { useLoading } from "@/hooks/useLoading";
import { AxiosRequestConfig } from "axios";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
  const {finishLoading, isLoading, startLoading} = useLoading()
  const searchParams = useSearchParams()
  const AuthFetch = useAuthFetch()

  const changePassword = async (formData: any) => {
    startLoading()

    const token = searchParams.get('token')

    const options: AxiosRequestConfig<any> = {
      headers: {
        token
      }
    }

    await AuthFetch({
      endpoint: 'change-password',
      formData,
      redirectRoute: '/',
      options
    })
    finishLoading()
  }

  return (
    <>
      <Form
        title="Cambiar contraseña" 
        onSubmit={changePassword}
        description="Formulario para cambiar contraseña"
      >
        <div className="my-[10px] flex flex-col gap-4">
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
        <Form.SubmitButton buttonText="Cambiar Contraseña" isLoading={isLoading}/>
      </Form>
    </>
  );
}