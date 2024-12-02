import { getUserById, loginUser, registerUser } from "../../database/controller/userController.js";
import verifyToken from "../middleware/verifyToken.js";

const user = (app) => {

  app.post("/user/login", async(req, res) => {
    console.log("Body",req.body)
    try{
      const login = await loginUser(req, res);
      res.status(201).json(login);
    }catch(error){
      res.status(400).json({message : error.message})
    }
  });

  app.post("/user/register", async (req, res) => {
    try {
      const savedUser  = await registerUser (req, res);
      res.status(201).json(savedUser );
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  app.get("/user/details", verifyToken, async(req,res)=>{
    try{
      const userId = req.user.id;
      const userexist = await getUserById(userId)
      res.status(200).json(userexist);
    }catch(error){
      res.status(400).json({message : error.message})
    }
  })
};

export default user;
