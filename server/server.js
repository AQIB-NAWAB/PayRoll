const  express =require ('express');
const  cors =require ('cors');
const  cookieParser =require ('cookie-parser');
const path=require("path")

const  mongoose =require ('mongoose');
const app = express();
app.use('/images', express.static(path.join(__dirname, 'public/images')));

app.use(cors({
    origin: ["http://ec2-3-109-108-17.ap-south-1.compute.amazonaws.com/"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());

app.use(express.static(path.join(__dirname, "../client/dist")));


mongoose.connect("mongodb+srv://aqib:aqib@form.yj6lgkp.mongodb.net/", {



}).then(()=>{
    console.log("DB Connected Suceesfuly")
}).catch(err=>{
    console.log(err)
})





const routes=require("./Routes/routes")
app.use("/api/v1",routes)

app.get("*", function (_, res) {
    res.sendFile(
      path.join(__dirname, "../client/dist/index.html"),
      function (err) {
        res.status(500).send(err);
      }
    );
  });

app.listen(8081, () => {
    console.log("Running");
});
