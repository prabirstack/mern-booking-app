import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";
export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  comfirmPassword: string;
};
const Register = () => {
  const navigate = useNavigate()
  const { showToast } = useAppContext();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const mutation = useMutation(apiClient.register, {
    onSuccess: () => {
      showToast({ message: "Registration succeessful", type: "SUCCESS" });
      navigate("/")
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">Create an account</h2>

      <div className="flex flex-col space-y-5 md:flex-row md:space-y-0 md:space-x-5">
        <label className="flex-1 text-sm font-bold text-gray-700">
          First Name
          <input
            className="w-full px-2 py-1 border rounded"
            {...register("firstName", { required: "First name is required" })}
          />
          {errors.firstName && (
            <span className="text-red-500">{errors.firstName.message}</span>
          )}
        </label>
        <label className="flex-1 text-sm font-bold text-gray-700">
          Last Name
          <input
            className="w-full px-2 py-1 border rounded"
            {...register("lastName", { required: "Last name is required" })}
          />
          {errors.lastName && (
            <span className="text-red-500">{errors.lastName.message}</span>
          )}
        </label>
      </div>
      <label className="flex-1 text-sm font-bold text-gray-700">
        Email
        <input
          type="email"
          className="w-full px-2 py-1 border rounded"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </label>
      <label className="flex-1 text-sm font-bold text-gray-700">
        Password
        <input
          type="password"
          className="w-full px-2 py-1 border rounded"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </label>
      <label className="flex-1 text-sm font-bold text-gray-700">
        Confirm Password
        <input
          type="password"
          className="w-full px-2 py-1 border rounded"
          {...register("comfirmPassword", {
            validate: (val) => {
              if (!val) {
                return "Confirm Password is required";
              } else if (watch("password") !== val) {
                return "Your password do not match";
              }
            },
          })}
        />
        {errors.comfirmPassword && (
          <span className="text-red-500">{errors.comfirmPassword.message}</span>
        )}
      </label>
      <span>
        <button
          type="submit"
          className="p-2 text-lg font-bold text-white bg-blue-600 hover:bg-blue-500"
        >
          Create Account
        </button>
      </span>
    </form>
  );
};
export default Register;
