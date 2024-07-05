import { zodResolver } from "@hookform/resolvers/zod";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { z } from "zod";

const registerUserValidator = z
  .object({
    name: z
      .string()
      .nonempty({ message: "Please fill in the name of your location" }),
    email: z
      .string()
      .email()
      .nonempty({ message: "email cannot be left empty" }),
    password: z
      .string()
      .min(10, { message: "Password must have at least 8 characters" })
      .nonempty({ message: "Password cannot be left empty" }),
  })
  .strict();

type registerUser = z.infer<typeof registerUserValidator>;

const RegistryPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<registerUser>({
    resolver: zodResolver(registerUserValidator),
  });

  const router = useRouter();

  const handleRegistrySubmit = async (data: registerUser) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/register`,
      {
        method: "POST",
        body: JSON.stringify({ ...data }),
        headers: {
          "content-type": "application/json",
        },
      }
    );
    if (response.ok) {
      router.push("/login");
    } else {
      console.log("Something went wrong!");
    }
  };

  return (
    <>
      <div className="">
        <Navbar />
        <form
          onSubmit={handleSubmit(handleRegistrySubmit)}
          className="registry-window"
        >
          <h1>Register</h1>
          <label htmlFor="name">QuickBite Name</label>
          <input id="name" type="text" {...register("name")}></input>
          <strong className="errorMsg">
            {errors.name && <p>{errors.name.message}</p>}
          </strong>
          <label htmlFor="email">Email</label>
          <input id="email" type="text" {...register("email")}></input>
          <strong className="errorMsg">
            {errors.email && <p>{errors.email.message}</p>}
          </strong>

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            {...register("password")}
          ></input>
          <strong className="errorMsg">
            {errors.password && <p>{errors.password.message}</p>}
          </strong>

          <button type="submit" className="register-button">
            Register
          </button>
        </form>
      </div>
    </>
  );
};
export default RegistryPage;
