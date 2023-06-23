"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (!session?.user.id) {
      toast.error("Bạn vui lòng đăng nhập!");
      router.push("/");
    }
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();
      setPosts(data);
    };
    if (session?.user.id) fetchPosts();
  }, [session?.user.id]);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  const handleDelete = async (post) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await fetch(`/api/prompt/${post._id.toString()}`, {
            method: "DELETE",
          });
          const filteredPosts = posts.filter((p) => p.id !== post._id);
          setPosts(filteredPosts);
          Swal.fire("Deleted!", "Your prompt has been deleted.", "success");
        } catch (error) {
          console.log(error);
        }
      }
    });

    // const hasConfirmed = confirm(
    //   "Are you sure you want to delete this prompt?"
    // );
    // if (hasConfirmed) {
    //   try {
    //     await fetch(`/api/prompt/${post._id.toString()}`, {
    //       method: "DELETE",
    //     });
    //     const filteredPosts = posts.filter((p) => p.id !== post._id);
    //     setPosts(filteredPosts);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
  };
  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
