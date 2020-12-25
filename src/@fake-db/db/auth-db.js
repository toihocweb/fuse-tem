import mock from "./../mock";
import _ from "@lodash";
import { FuseUtils } from "@fuse";
import jwt from "jsonwebtoken";

const jwtConfig = {
  secret: "OvNYAtDUfBCGvocGgsDy",
  expiresIn: "2 days", // A numeric value is interpreted as a seconds count. If you use a string be sure you provide the time units (days, hours, etc)
};

const authDB = {
  users: [
    {
      uuid: "5725a680b8d240c011dd224b",
      from: "custom-db",
      password: "staff",
      role: "staff",
      data: {
        displayName: "Josefina",
        photoURL: "assets/images/avatars/Josefina.jpg",
        email: "josefina@gmail.com",
        settings: {
          layout: {
            style: "layout3",
            config: {
              mode: "boxed",
              scroll: "content",
              navbar: {
                display: true,
              },
              toolbar: {
                display: true,
                position: "below",
              },
              footer: {
                display: true,
                style: "fixed",
              },
            },
          },
          customScrollbars: true,
          theme: {
            main: "greeny",
            navbar: "mainThemeDark",
            toolbar: "mainThemeDark",
            footer: "mainThemeDark",
          },
        },
        shortcuts: ["calendar", "mail", "contacts", "todo"],
      },
    },

    {
      uuid: "XgbuVEXBU6gtSKdbTYR1Zbbby1i3",
      from: "custom-db",
      password: "staff",
      role: "staff",
      data: {
        displayName: "Arnold Matlock",
        photoURL: "assets/images/avatars/Arnold.jpg",
        email: "arnold@gmail.com",
        settings: {
          layout: {
            style: "layout2",
            config: {
              mode: "boxed",
              scroll: "content",
              navbar: {
                display: true,
              },
              toolbar: {
                display: true,
                position: "below",
              },
              footer: {
                display: true,
                style: "fixed",
              },
            },
          },
          customScrollbars: true,
          theme: {
            main: "greeny",
            navbar: "mainThemeDark",
            toolbar: "mainThemeDark",
            footer: "mainThemeDark",
          },
        },
        shortcuts: ["calendar", "mail", "contacts", "todo"],
      },
    },
    {
      uuid: "XgbuVEXBU5gtSKdbQRP1Zbbby1i1",
      from: "custom-db",
      password: "admin",
      role: "admin",
      data: {
        displayName: "Abbott Keitch",
        photoURL: "assets/images/avatars/Abbott.jpg",
        email: "abbott@gmail.com",
        settings: {
          layout: {
            style: "layout1",
            config: {
              scroll: "content",
              navbar: {
                display: true,
                folded: true,
                position: "left",
              },
              toolbar: {
                display: true,
                style: "fixed",
                position: "below",
              },
              footer: {
                display: true,
                style: "fixed",
                position: "below",
              },
              mode: "fullwidth",
            },
          },
          customScrollbars: true,
          theme: {
            main: "defaultDark",
            navbar: "defaultDark",
            toolbar: "defaultDark",
            footer: "defaultDark",
          },
        },
        shortcuts: ["calendar", "mail", "contacts"],
      },
    },

    {
      uuid: "5725a68009e20d0a9e9acf2a",
      from: "custom-db",
      password: "staff",
      role: "staff",
      data: {
        displayName: "Barrera",
        photoURL: "assets/images/avatars/Barrera.jpg",
        email: "barrera@gmail.com",
        settings: {
          layout: {
            style: "layout2",
            config: {
              mode: "boxed",
              scroll: "content",
              navbar: {
                display: true,
              },
              toolbar: {
                display: true,
                position: "below",
              },
              footer: {
                display: true,
                style: "fixed",
              },
            },
          },
          customScrollbars: true,
          theme: {
            main: "greeny",
            navbar: "mainThemeDark",
            toolbar: "mainThemeDark",
            footer: "mainThemeDark",
          },
        },
        shortcuts: ["calendar", "mail", "contacts", "todo"],
      },
    },
    {
      uuid: "5725a680b3249760ea21de52",
      from: "custom-db",
      password: "staff",
      role: "staff",
      data: {
        displayName: "Alice Freeman",
        photoURL: "assets/images/avatars/alice.jpg",
        email: "alice@gmail.com",
        settings: {
          layout: {
            style: "layout3",
            config: {
              mode: "boxed",
              scroll: "content",
              navbar: {
                display: true,
              },
              toolbar: {
                display: true,
                position: "below",
              },
              footer: {
                display: true,
                style: "fixed",
              },
            },
          },
          customScrollbars: true,
          theme: {
            main: "greeny",
            navbar: "mainThemeDark",
            toolbar: "mainThemeDark",
            footer: "mainThemeDark",
          },
        },
        shortcuts: ["calendar", "mail", "contacts", "todo"],
      },
    },

    {
      uuid: "5725a680bc670af746c435e2",
      from: "custom-db",
      password: "guest",
      role: "guest",
      data: {
        displayName: "Copeland",
        photoURL: "assets/images/avatars/Copeland.jpg",
        email: "copeland@gmail.com",
        settings: {
          layout: {
            style: "layout3",
            config: {
              mode: "boxed",
              scroll: "content",
              navbar: {
                display: true,
              },
              toolbar: {
                display: true,
                position: "below",
              },
              footer: {
                display: true,
                style: "fixed",
              },
            },
          },
          customScrollbars: true,
          theme: {
            main: "greeny",
            navbar: "mainThemeDark",
            toolbar: "mainThemeDark",
            footer: "mainThemeDark",
          },
        },
        shortcuts: ["calendar", "mail", "contacts", "todo"],
      },
    },
    {
      uuid: "5725a6809fdd915739187ed5",
      from: "custom-db",
      password: "staff",
      role: "staff",
      data: {
        displayName: "Blair",
        photoURL: "assets/images/avatars/Blair.jpg",
        email: "blair@gmail.com",
        settings: {
          layout: {
            style: "layout3",
            config: {
              mode: "boxed",
              scroll: "content",
              navbar: {
                display: true,
              },
              toolbar: {
                display: true,
                position: "below",
              },
              footer: {
                display: true,
                style: "fixed",
              },
            },
          },
          customScrollbars: true,
          theme: {
            main: "greeny",
            navbar: "mainThemeDark",
            toolbar: "mainThemeDark",
            footer: "mainThemeDark",
          },
        },
        shortcuts: ["calendar", "mail", "contacts", "todo"],
      },
    },
    {
      uuid: "5725a68007920cf75051da64",
      from: "custom-db",
      password: "guest",
      role: "guest",
      data: {
        displayName: "Boyle",
        photoURL: "assets/images/avatars/Boyle.jpg",
        email: "boyle@gmail.com",
        settings: {
          layout: {
            style: "layout3",
            config: {
              mode: "boxed",
              scroll: "content",
              navbar: {
                display: true,
              },
              toolbar: {
                display: true,
                position: "below",
              },
              footer: {
                display: true,
                style: "fixed",
              },
            },
          },
          customScrollbars: true,
          theme: {
            main: "greeny",
            navbar: "mainThemeDark",
            toolbar: "mainThemeDark",
            footer: "mainThemeDark",
          },
        },
        shortcuts: ["calendar", "mail", "contacts", "todo"],
      },
    },
    {
      uuid: "5725a68031fdbb1db2c1af47",
      from: "custom-db",
      password: "guest",
      role: "guest",
      data: {
        displayName: "Christy",
        photoURL: "assets/images/avatars/Christy.jpg",
        email: "christy@gmail.com",
        settings: {
          layout: {
            style: "layout3",
            config: {
              mode: "boxed",
              scroll: "content",
              navbar: {
                display: true,
              },
              toolbar: {
                display: true,
                position: "below",
              },
              footer: {
                display: true,
                style: "fixed",
              },
            },
          },
          customScrollbars: true,
          theme: {
            main: "greeny",
            navbar: "mainThemeDark",
            toolbar: "mainThemeDark",
            footer: "mainThemeDark",
          },
        },
        shortcuts: ["calendar", "mail", "contacts", "todo"],
      },
    },
    {
      uuid: "5725a680e7eb988a58ddf303",
      from: "custom-db",
      password: "guest",
      role: "guest",
      data: {
        displayName: "Estes",
        photoURL: "assets/images/avatars/Estes.jpg",
        email: "estes@gmail.com",
        settings: {
          layout: {
            style: "layout3",
            config: {
              mode: "boxed",
              scroll: "content",
              navbar: {
                display: true,
              },
              toolbar: {
                display: true,
                position: "below",
              },
              footer: {
                display: true,
                style: "fixed",
              },
            },
          },
          customScrollbars: true,
          theme: {
            main: "greeny",
            navbar: "mainThemeDark",
            toolbar: "mainThemeDark",
            footer: "mainThemeDark",
          },
        },
        shortcuts: ["calendar", "mail", "contacts", "todo"],
      },
    },
    {
      uuid: "5725a680dcb077889f758961",
      from: "custom-db",
      password: "guest",
      role: "guest",
      data: {
        displayName: "Harper",
        photoURL: "assets/images/avatars/Harper.jpg",
        email: "harper@gmail.com",
        settings: {
          layout: {
            style: "layout3",
            config: {
              mode: "boxed",
              scroll: "content",
              navbar: {
                display: true,
              },
              toolbar: {
                display: true,
                position: "below",
              },
              footer: {
                display: true,
                style: "fixed",
              },
            },
          },
          customScrollbars: true,
          theme: {
            main: "greeny",
            navbar: "mainThemeDark",
            toolbar: "mainThemeDark",
            footer: "mainThemeDark",
          },
        },
        shortcuts: ["calendar", "mail", "contacts", "todo"],
      },
    },
    {
      uuid: "5725a6806acf030f9341e925",
      from: "custom-db",
      password: "staff",
      role: "staff",
      data: {
        displayName: "Helen",
        photoURL: "assets/images/avatars/Helen.jpg",
        email: "helen@gmail.com",
        settings: {
          layout: {
            style: "layout3",
            config: {
              mode: "boxed",
              scroll: "content",
              navbar: {
                display: true,
              },
              toolbar: {
                display: true,
                position: "below",
              },
              footer: {
                display: true,
                style: "fixed",
              },
            },
          },
          customScrollbars: true,
          theme: {
            main: "greeny",
            navbar: "mainThemeDark",
            toolbar: "mainThemeDark",
            footer: "mainThemeDark",
          },
        },
        shortcuts: ["calendar", "mail", "contacts", "todo"],
      },
    },
    {
      uuid: "5725a680ae1ae9a3c960d487",
      from: "custom-db",
      password: "admin",
      role: "admin",
      data: {
        displayName: "Henderson",
        photoURL: "assets/images/avatars/Henderson.jpg",
        email: "henderson@gmail.com",
        settings: {
          layout: {
            style: "layout3",
            config: {
              mode: "boxed",
              scroll: "content",
              navbar: {
                display: true,
              },
              toolbar: {
                display: true,
                position: "below",
              },
              footer: {
                display: true,
                style: "fixed",
              },
            },
          },
          customScrollbars: true,
          theme: {
            main: "greeny",
            navbar: "mainThemeDark",
            toolbar: "mainThemeDark",
            footer: "mainThemeDark",
          },
        },
        shortcuts: ["calendar", "mail", "contacts", "todo"],
      },
    },

    {
      uuid: "5725a68034cb3968e1f79eac",
      from: "custom-db",
      password: "guest",
      role: "guest",
      data: {
        displayName: "Katina",
        photoURL: "assets/images/avatars/Katina.jpg",
        email: "katina@gmail.com",
        settings: {
          layout: {
            style: "layout3",
            config: {
              mode: "boxed",
              scroll: "content",
              navbar: {
                display: true,
              },
              toolbar: {
                display: true,
                position: "below",
              },
              footer: {
                display: true,
                style: "fixed",
              },
            },
          },
          customScrollbars: true,
          theme: {
            main: "greeny",
            navbar: "mainThemeDark",
            toolbar: "mainThemeDark",
            footer: "mainThemeDark",
          },
        },
        shortcuts: ["calendar", "mail", "contacts", "todo"],
      },
    },
  ],
};

mock.onGet("/api/auth").reply((config) => {
  const data = JSON.parse(config.data);
  const { email, password } = data;

  const user = _.cloneDeep(
    authDB.users.find((_user) => _user.data.email === email)
  );

  const error = {
    email: user ? null : "Check your username/email",
    password: user && user.password === password ? null : "Check your password",
  };

  if (!error.email && !error.password && !error.displayName) {
    delete user["password"];

    const access_token = jwt.sign({ id: user.uuid }, jwtConfig.secret, {
      expiresIn: jwtConfig.expiresIn,
    });

    const response = {
      user: user,
      access_token: access_token,
    };

    return [200, response];
  } else {
    return [200, { error }];
  }
});

mock.onGet("/api/auth/access-token").reply((config) => {
  const data = JSON.parse(config.data);
  const { access_token } = data;

  try {
    const { id } = jwt.verify(access_token, jwtConfig.secret);

    const user = _.cloneDeep(authDB.users.find((_user) => _user.uuid === id));
    delete user["password"];

    const updatedAccessToken = jwt.sign({ id: user.uuid }, jwtConfig.secret, {
      expiresIn: jwtConfig.expiresIn,
    });

    const response = {
      user: user,
      access_token: updatedAccessToken,
    };

    return [200, response];
  } catch (e) {
    const error = "Invalid access token detected";
    return [401, { error }];
  }
});

mock.onPost("/api/auth/register").reply((request) => {
  const data = JSON.parse(request.data);
  const { displayName, password, email } = data;
  const isEmailExists = authDB.users.find(
    (_user) => _user.data.email === email
  );
  const error = {
    email: isEmailExists ? "The email is already in use" : null,
    displayName: displayName !== "" ? null : "Enter display name",
    password: null,
  };
  if (!error.displayName && !error.password && !error.email) {
    const newUser = {
      uuid: FuseUtils.generateGUID(),
      from: "custom-db",
      password: password,
      role: "guest",
      data: {
        displayName: displayName,
        photoURL: "assets/images/avatars/Abbott.jpg",
        email: email,
        settings: {},
        shortcuts: [],
      },
    };

    authDB.users = [...authDB.users, newUser];

    const user = _.cloneDeep(newUser);
    delete user["password"];

    const access_token = jwt.sign({ id: user.uuid }, jwtConfig.secret, {
      expiresIn: jwtConfig.expiresIn,
    });

    const response = {
      user: user,
      access_token: access_token,
    };

    return [200, response];
  } else {
    return [200, { error }];
  }
});

mock.onPost("/api/auth/user/update").reply((config) => {
  const data = JSON.parse(config.data);
  const { user } = data;

  authDB.users = authDB.users.map((_user) => {
    if (user.uuid === user.id) {
      return _.merge(_user, user);
    }
    return _user;
  });

  return [200, user];
});

mock.onGet("/api/user/all").reply(() => {
  return [200, authDB.users];
});

mock.onPost("/api/user/new").reply((request) => {
  const newUser = JSON.parse(request.data);
  const isEmailExists = authDB.users.find(
    (user) => user.data.email === newUser.data.email
  );
  const error = {
    email: isEmailExists ? "This email is already used" : null,
  };
  if (!error.email) {
    authDB.users = [...authDB.users, newUser];
    return [200, newUser];
  } else return [200, { error }];
});
