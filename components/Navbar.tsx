import { auth, signOut, signIn } from "@/auth";
import Image from "next/image"
import Link from "next/link"

const Navbar = async () => {

    const session = await auth()

  return (
    <div className="px-5 py-3 bg-white shadow-md font-work-sans">
        <div className="flex items-center justify-between">
                <Link href="/">
                    <Image src="/logo.png" alt="logo" width={144} height={30} />
                </Link>

                <div className="flex items-center gap-5 text-black">
                    {session && session?.user ? (
                        <>
                            <Link href="/startup/create">
                                <span>Create</span>
                            </Link>

                            <form
                                action={async () => {
                                "use server";

                                await signOut({ redirectTo: "/" });
                                }}
                            >
                                <button type="submit">
                                <span className="max-sm:hidden">Logout</span>
                                </button>
                            </form>

                            <Link href={`/user/${session?.user?.id}`}>
                                <span>{session?.user?.name}</span>
                            </Link>

                        </>
                    ) : (
                       <form action={async () => {
                            'use server';
                            await signIn('github');
                        }}>
                            <button type="submit">Login</button>
                        </form>
                    )}
                </div>
        </div>
    </div>
  )
}

export default Navbar
