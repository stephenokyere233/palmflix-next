import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { MdArrowBackIosNew } from "react-icons/md";



const Profile = () => {
    const [updateForm, setUpdateForm] = React.useState({
        profile: "",
        name: "",
        email: "",
        phone: "",
    });


    const NRInput = ({
        title,
        type,
        autoComplete,
        onChange,
        value,
        name,
        maxLength,
        placeholder,
        width,
        min,
        max,
        className,
        styles,
    }) => {
        return (
            <fieldset
                className={`
        } border-gray-200
      dark:border-gray-700  w-[${width}] rounded-md border p-2 ${className}`}
            >
                <legend className={`${className}`}>{title}</legend>
                <input
                    type={type}
                    aria-hidden="true"
                    placeholder={placeholder}
                    name={name}
                    value={value}
                    autoComplete={autoComplete}
                    spellCheck="false"
                    tabIndex={0}
                    min={min}
                    max={max}
                    maxLength={maxLength}
                    autoCapitalize="none"
                    onChange={onChange}
                    className={`w-full bg-transparent pb-2 indent-2 outline-none ${styles}`}
                />
            </fieldset>
        );
    };

    // const controlUpdateForm = (event) => {
    //     const { name, value } = event.target;

    //     setUpdateForm((prev) => ({
    //         ...prev,
    //         [name]: value,
    //     }));
    // };
    // const { btn, sendNewProfileInfo } = useUpdateProfile()

    // async function handleSubmit(event) {
    //     event.preventDefault();
    //     await sendNewProfileInfo(userData._id, updateForm)
    //     console.log(updateForm);
    // }
    // const { userData } = useContext(AppContext);

    // React.useEffect(() => {
    //     if (!userData) return;

    //     setUpdateForm({
    //         name: userData.name,
    //         email: userData.email,
    //         phone: userData.phone,
    //         profile: userData.profile ? userData.profile : "",
    //     });
    // }, [userData]);

    // const handleImageUpload = (event) => {
    //     const image = event.target.files[0];
    //     if (!image) return;
    //     const reader = new FileReader();

    //     reader.onload = function (event) {
    //         setUpdateForm((prev) => ({
    //             ...prev,
    //             profile: reader.result,
    //         }));
    //     };

    //     reader.readAsDataURL(image);
    // };

    return (
        <section className="border w-full flex items-center justify-center flex-1 h-[90vh]">

        <div className="border w-[400px] flex flex-col items-center">
         
                    <Link
                        href={""}
                        className="hidden w-full items-center md:flex"
                    >
                        <MdArrowBackIosNew size={20} className="my-2" />
                        <p className="opacity-70">Back</p>
                    </Link>
                    <Link
                        href={""}
                        className="absolute top-24 left-2 flex w-full items-center md:hidden"
                    >
                        <MdArrowBackIosNew size={20} className="my-2" />
                        <p className="opacity-70">Back</p>
                    </Link>
                    <div className=" my-4 text-center">
                        <h2 className="text-2xl font-bold uppercase tracking-tighter text-brand">
                            Manage
                        </h2>
                        <h2 className="text-lg">Edit your profile info</h2>
                    </div>
                    {updateForm.profile ? (
                        <Image
                            src={updateForm.profile}
                            className="h-32 w-32 rounded-full bg-contain object-cover"
                            alt="profile_image"
                            height={500}
                            width={500}
                        />
                    ) : (
                        <div className="mb-4 flex h-32 w-32 items-center justify-center rounded-full bg-brand pt-3 text-7xl font-bold uppercase">
                            <p>{updateForm.name.charAt(0)}</p>
                        </div>
                    )}
                    <form className="flex flex-col gap-4" 
                    
                    // onSubmit={handleSubmit}
                    >
                        <NRInput
                            title="Avatar"
                            name="profile"
                            type="file"
                            // onChange={handleImageUpload}
                            width="300px"
                        />
                        <NRInput
                            title="Name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            placeholder="Your name"
                            // onChange={controlUpdateForm}
                            value={updateForm.name}
                            width="300px"
                        />
                        <NRInput
                            title="Email"
                            name="email"
                            type="email"
                            value={updateForm.email}
                            autoComplete="email"
                            // onChange={controlUpdateForm}
                            placeholder="johndoe21@example.com"
                            width="300px"
                        />
                        <NRInput
                            title="Phone"
                            name="phone"
                            type="tel"
                            value={updateForm.phone}
                            autoComplete="phone"
                            // onChange={controlUpdateForm}
                            placeholder="0xxxxxxxxx"
                            width="300px"
                        />
                        <div className="pt-2">
                            {/* <Button name={btn} /> */}
                        </div>
                    </form>
    
        </div>
        </section>

    );
};

export default Profile;