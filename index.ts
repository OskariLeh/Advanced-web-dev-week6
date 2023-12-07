import express, {Express, Request, Response} from "express"
import path from "path"
const app: Express = express()
const port: number = 3000

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(path.dirname(__dirname), 'public')));

interface Vehicle {
    model: string,
    color: string,
    year: number,
    power: number
}

interface Car extends Vehicle {
    bodytype: string,
    wheelCount: number
}

interface Boat extends Vehicle {
    draft: number
}

interface Plane extends Vehicle {
    wingspan: number
}

let vehicles: Array<Vehicle> = []

app.get("/hello", (req: Request, res: Response) => {
    res.send({"msg": "Hello world"})
})

app.post("/vehicle/add", (req: Request, res: Response) => {
    let newVehicle: Vehicle = req.body
    vehicles.push(newVehicle)
    res.status(201)
    res.send({"msg": "Vehicle Added"})
})

app.get("/vehicle/search/:model", (req: Request, res: Response) => {
    let model: string = req.params.model
    let found: boolean = false
    vehicles.forEach(vehicle => {
        if (vehicle.model == model) {
            found = true
            res.send(vehicle)
        }
    });
    if (!found) {
        res.status(404)
    }
})

app.listen(port, () => {
    console.log("Server running on port:" + port)

})