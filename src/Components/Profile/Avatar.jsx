import React, { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";
import BASE_URL from "../../API/api";
import AuthContext from "../../Auth/AuthContext";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import routes from "../routes/route";

const Avatar = () => {
  const [avatarTree, setAvatarTree] = useState([]);
  const { user, avatar, setAvatar } = useContext(AuthContext);
  const [selectedAvatarId, setSelectedAvatarId] = useState(null);
  const navigate = useNavigate();

  // ✅ Pre-select current avatar
  useEffect(() => {
    if (avatar?.avatar?.id) {
      setSelectedAvatarId(avatar.avatar.id); // ✅ Use the correct path
    }
  }, [avatar]);

  // ✅ Fetch avatar only once per session
  useEffect(() => {
    const fetchAvatars = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/player/get-avatar`, {
          headers: { Authorization: `Bearer ${user?.token}` },
        });

        if (response.data.status === "success") {
          setAvatarTree(response.data.avatar);
        }
      } catch (err) {
        console.error("Error loading avatars", err);
        toast.error("Failed to load avatars.");
      }
    };

    if (user?.token) {
      fetchAvatars();
    }
  }, [user]);

  const handleAvatarSubmit = async () => {
    if (!selectedAvatarId) {
      toast.warn("Please select an avatar");
      return;
    }

    try {
      const response = await axios.get(`${BASE_URL}/player/update-profile`, {
        params: { avatar_id: selectedAvatarId },
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

      if (response.data.status === "success") {
        toast.success("Avatar updated successfully!");

        const profileRes = await axios.get(`${BASE_URL}/player/profile`, {
          headers: { Authorization: `Bearer ${user?.token}` },
        });

        setAvatar(profileRes.data.player);
        sessionStorage.removeItem("avatarFetched"); // optional: allow refetch on return
        navigate("/account-dashboard");
      } else {
        toast.error(response.data.message || "Failed to update avatar.");
      }
    } catch (error) {
      console.error("Avatar update error:", error);
      toast.error("Something went wrong while updating avatar.");
    }
  };

  return (
    <section className="container position-relative">
      <div className="h-100">
        <div className="pt-3 pb-2">
          <div className="row px-2">
            {/* Header */}
            <div className="d-flex align-items-center justify-content-between position-relative px-0">
              <div className="d-flex align-items-center px-0">
                <Link to={routes.account.dashboard}>
                  <button className="go_back_btn bg-grey">
                    <i className="ri-arrow-left-s-line text-white fs-20" />
                  </button>
                </Link>
              </div>
              <h5 className="position-absolute start-50 translate-middle-x m-0 text-white fs-16">
                Choose Your Avatar
              </h5>
            </div>

            {/* Avatar Display Section */}
            <div className="container mt-4">
              {avatarTree.map((topLevel) =>
                topLevel.children.map((category) => {
                  const subcategoriesWithAvatars = category.children.filter(
                    (child) => child.avatars && child.avatars.length > 0
                  );

                  if (subcategoriesWithAvatars.length === 0) return null;

                  return (
                    <React.Fragment key={category.id}>
                      <div className="mb-4">
                        <h5 className="text-white mb-2">
                          {category.category_name}
                        </h5>

                        {subcategoriesWithAvatars.map((sub) => (
                          <div key={sub.id} className="mb-3 ps-2">
                            <h6 className="text-light">{sub.category_name}</h6>
                            <div className="d-flex flex-wrap">
                              {sub.avatars.map((avatar) => (
                                <div
                                  key={avatar.id}
                                  className={`avatar-container ${
                                    selectedAvatarId === avatar.id
                                      ? "selected-avatar"
                                      : ""
                                  }`}
                                  onClick={() => setSelectedAvatarId(avatar.id)}
                                  style={{
                                    cursor: "pointer",
                                    marginRight: "10px",
                                  }}
                                >
                                  <img
                                    src={avatar.image}
                                    alt={avatar.name}
                                    className="img-fluid avatar-circle"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </React.Fragment>
                  );
                })
              )}
            </div>

            {/* Submit Button Outside of Map */}
            <div className="d-flex justify-content-center mt-4 mb-3">
              <button
                type="button"
                className="btn btn-login w-50 text-capitalize"
                onClick={handleAvatarSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Avatar;
