import  User  from "./User.schema";


export const insertUser = (userObj: { role: any; name: any; email: any; password: string; }) => {
  return new Promise((resolve, reject) => {
    console.log(userObj);
    
    new User(userObj)
      .save()
      .then((data: unknown) => resolve(data))
      .catch((error: any) => reject(error));
  });
};

export const getUserByEmail = (email: string) => {
  console.log("In getUserByEmail : ", email);
  
  return new Promise((resolve, reject) => {
    if (!email) return false;

    try {
      console.log("in try");
      console.log({email});
      
      const user = User.findOne({ email });
      if (!user) {
        resolve(null);
        return;
      }  
        resolve(user);
      
    } catch (error) {
      console.log("Received Error in Catch");
      reject(error);
    }
  });
}
export const getAllUsers = () => {
  
  console.log("Get All Users...");
  
  return new Promise((resolve, reject) => {
    

    try {
    
      const user = User.find({});
      console.log(user);
      
      if (!user) {
        resolve(null);
        return;
      }  
        resolve(user);
      
    } catch (error) {
      console.log("Received Error in Catch");
      reject(error);
    }
  });
}
export const getUserById = (_id: string) => {
  return new Promise((resolve, reject) => {
    if (!_id) return false;

    try {
      User.findOne({ _id }, (error: any, data: unknown) => {
        if (error) {
          console.log(error);
          reject(error);
        }
        resolve(data);
          
        
      });
    } catch (error) {
      reject(error);
    }
  });
};
export const updateRoleById = (_id: string, role: string) => {
  return new Promise(async(resolve, reject) => {
    if (!_id) return false;

    try {
      console.log("Entered...", _id , '   ', role);
      
       User.findOneAndUpdate({ _id }, { role }, { new: true }, (error: any, updatedUser: unknown) => {
        console.log("ONCE");
        
        if (error) {
          console.log(error);
          reject(error);
        }
        resolve(updatedUser);
      }  );
        
          
        
    
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};
export const updatePasswordById = (_id: string, password: string) => {
  return new Promise(async(resolve, reject) => {
    if (!_id) return false;

    try {
      console.log("Entered...", _id , '   ', password);
      
       User.findOneAndUpdate({ _id }, { password }, { new: true }, (error: any, updatedUser: unknown) => {
        console.log("ONCE");
        
        if (error) {
          console.log(error);
          reject(error);
        }
        resolve(updatedUser);
      }  );
        
          
        
    
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};
export const deleteUserById = (_id: string) => {
  return new Promise(async(resolve, reject) => {
    if (!_id) return false;

    try {
      
       User.findByIdAndDelete({ _id }, { new: true }, (error: any) => {
        
        if (error) {
          console.log(error);
          reject(error);
        }
        resolve(true);
      }  );
        
          
        
    
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

export const storeUserRefreshJWT = (_id: string, token: string) => {
  return new Promise((resolve, reject) => {
    try {
      User.findOneAndUpdate(
        { _id },
        {
          $set: { "refreshJWT.token": token, "refreshJWT.addedAt": Date.now() },
        },
        { new: true }
      )
        .then((data) => resolve(data))
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};


export const updatePassword = (email: string, newhashedPass: string) => {
  return new Promise((resolve, reject) => {
    try {
      User.findOneAndUpdate(
        { email },
        {
          $set: { password: newhashedPass },
        },
        { new: true }
      )
        .then((data: unknown) => resolve(data))
        .catch((error: any) => {
          console.log(error);
          reject(error);
        
        });
    } catch (error) {
      console.log(error);
      reject(error);
      
    }
  });
};


module.exports = {
  insertUser,
  getUserByEmail,
  getUserById,
  getAllUsers,
  updateRoleById,
  updatePasswordById,
  deleteUserById,
  storeUserRefreshJWT
}