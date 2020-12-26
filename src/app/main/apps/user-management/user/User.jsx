import React, { useEffect, useState, useRef } from "react";
import { FusePageCarded, FuseAnimate } from "@fuse";
import { useForm } from "@fuse/hooks";
import withReducer from "app/store/withReducer";
import reducer from "../store/reducers";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Icon, Button } from "@material-ui/core";
import { TextFieldFormsy, SelectFormsy } from "@fuse";
import Formsy from "formsy-react";
import { makeStyles, MenuItem } from "@material-ui/core";
import clsx from "clsx";
import { Link } from "react-router-dom";
import * as actions from "../store/actions";
import _ from "@lodash";
import history from "@history";

const useStyles = makeStyles((theme) => ({
  userPhotoUpload: {
    background: theme.palette.background.default,
    transitionProperty: "box-shadow",
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
  },
}));

const User = (props) => {
  const classes = useStyles(props);
  const dispatch = useDispatch();
  const authUser = useSelector(({ auth }) => auth.user);
  const user = useSelector(
    ({ userManagementApp }) => userManagementApp.user.data
  );
  const error = useSelector(
    ({ userManagementApp }) => userManagementApp.user.error
  );
  const { form, handleChange, setForm } = useForm(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [path, setPath] = useState("");
  const formRef = useRef(null);

  useEffect(() => {
    if ((user && !form) || (user && form && user.uuid !== form.uuid))
      setForm(user);
  }, [form, user, setForm]);

  useEffect(() => {
    if (error) {
      formRef.current.updateInputsWithError({
        ...error,
      });
      disableButton();
      dispatch(actions.reset());
    }
  }, [error, dispatch]);

  useEffect(() => {
    const params = props.match.params;
    const { userId } = params;
    setPath(userId);
    if (userId === "new") dispatch(actions.initNewUser());
    else if (userId === "authUser")
      dispatch(actions.getUser({ userId: authUser.uuid }));
    else dispatch(actions.getUser(params));
  }, [dispatch, props.match.params, authUser]);

  const disableButton = () => {
    setIsFormValid(false);
  };

  const enableButton = () => {
    setIsFormValid(true);
  };

  const handleUploadChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsBinaryString(file);

    reader.onload = () => {
      setForm({
        ...form,
        data: {
          ...form.data,
          photoURL: `data:${file.type};base64,${btoa(reader.result)}`,
        },
      });
    };

    reader.onerror = () => {
      console.log("error on load image");
    };
  };

  const isAbleToSubmit = () => {
    return form.data.displayName > 0 && !_.isEqual(user, form);
  };

  const handleSubmit = (data) => {
    if (path === "new") {
      dispatch(actions.saveUser(data));
      history.push("/apps/user-management/users/" + form.uuid);
    }
    dispatch(actions.updateUser(data));
  };

  return (
    <FusePageCarded
      classes={{
        header: "min-h-72 h-72 sm:h-136 sm:min-h-136",
      }}
      header={
        form && (
          <div className="flex flex-1 w-full items-center justify-between">
            <div className="flex flex-col items-start max-w-full">
              <FuseAnimate animation="transition.slideRightIn" delay={300}>
                <Typography
                  className="normal-case flex items-center max-w-full"
                  component={Link}
                  role="button"
                  to="/apps/user-management/users"
                  color="inherit"
                >
                  <Icon className="mr-4 text-20">arrow_back</Icon>
                  Users
                </Typography>
              </FuseAnimate>
              <div className="flex items-center max-w-full mt-8">
                <FuseAnimate animation="transition.expandIn" delay={300}>
                  {form.data.photoURL ? (
                    <img
                      className="w-32 h-32 sm:w-48 sm:h-48 mr-8 sm:mr-16 rounded-full"
                      src={form.data.photoURL}
                      alt={form.data.displayName}
                    />
                  ) : (
                    <img
                      className="w-32= sm:w-48 mr-8 sm:mr-16 rounded-full"
                      src="assets/images/avatars/profile.jpg"
                      alt="profile-avatar"
                    />
                  )}
                </FuseAnimate>
                <div className="flex flex-col min-w-0">
                  <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                    <Typography className="text-16 sm:text-20 truncate">
                      {form.data.displayName
                        ? form.data.displayName
                        : "New User"}
                    </Typography>
                  </FuseAnimate>
                  <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                    <Typography variant="caption">User Detail</Typography>
                  </FuseAnimate>
                </div>
              </div>
            </div>
          </div>
        )
      }
      content={
        form && (
          <div className="flex">
            <div className="p-16 sm:w-2/5 sm:p-24 w-full">
              <div className="flex flex-col items-center justify-center">
                <Typography className="text-16 sm:text-20 flex items-center max-w-full">
                  Profile photo
                </Typography>
                <div className="flex items-center justify-center relative w-192 h-192 mt-16">
                  {form.data.photoURL ? (
                    <img
                      className="max-w-none w-auto h-full rounded-full"
                      src={form.data.photoURL}
                      alt={form.data.displayName}
                    />
                  ) : (
                    <img
                      className="max-w-none w-auto h-full rounded-full"
                      src="assets/images/avatars/profile-max.jpg"
                      alt="profile-avatar"
                    />
                  )}
                </div>
                <div className="p-16 mt-16">
                  <input
                    accept="image/*"
                    className="hidden"
                    id="button-file"
                    type="file"
                    onChange={handleUploadChange}
                  />
                  <div className="flex justify-center sm:justify-start flex-wrap">
                    <label
                      htmlFor="button-file"
                      className={clsx(
                        "flex items-center justify-center relative py-4 px-16 rounded-4 overflow-hidden cursor-pointer shadow-1 hover:shadow-5",
                        classes.userPhotoUpload
                      )}
                    >
                      <Icon className="mr-8" fontSize="large" color="action">
                        cloud_upload
                      </Icon>
                      Upload your Photo
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-16 sm:w-3/5 sm:p-24 w-full">
              <FuseAnimate animation="transition.slideLeftIn">
                <Typography className="text-16 sm:text-20 max-w-full mb-16">
                  Profile Information
                </Typography>
              </FuseAnimate>
              <FuseAnimate animation="transition.slideRightIn">
                <Formsy
                  onValidSubmit={() => handleSubmit(form)}
                  onValid={enableButton}
                  onInvalid={disableButton}
                  ref={formRef}
                >
                  <TextFieldFormsy
                    inputProps={{ autoComplete: "off" }}
                    className="mt-8 mb-16"
                    label="Name"
                    autoFocus
                    id="displayName"
                    name="displayName"
                    value={form.data.displayName}
                    onChange={(e) => handleChange(e, "data")}
                    variant="outlined"
                    fullWidth
                    validations={{
                      minLength: 4,
                    }}
                    validationErrors={{
                      minLength: "Min character length is 4",
                    }}
                    required
                  />
                  <TextFieldFormsy
                    inputProps={{ autoComplete: "off" }}
                    className="mt-8 mb-16"
                    label="Email"
                    id="email"
                    name="email"
                    value={form.data.email}
                    onChange={(e) => handleChange(e, "data")}
                    variant="outlined"
                    fullWidth
                    validations="isEmail"
                    validationErrors={{
                      isEmail: "Please enter a valid email",
                    }}
                    required
                  />
                  <SelectFormsy
                    className="mt-8 mb-16 w-full"
                    label="Role"
                    id="role"
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    variant="outlined"
                  >
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="staff">Staff</MenuItem>
                    <MenuItem value="guest">Guest</MenuItem>
                  </SelectFormsy>
                  <Button
                    className="normal-case mt-16 p-8 whitespace-no-wrap"
                    type="submit"
                    variant="contained"
                    disabled={!isAbleToSubmit() && !isFormValid}
                    fullWidth
                  >
                    Save
                  </Button>
                </Formsy>
              </FuseAnimate>
            </div>
          </div>
        )
      }
      innerScroll
    />
  );
};

export default withReducer("userManagementApp", reducer)(User);
