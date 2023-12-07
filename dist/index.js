"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static(path_1.default.join(path_1.default.dirname(__dirname), 'public')));
let vehicles = [];
app.get("/hello", (req, res) => {
    res.send("Hello world");
});
app.post("/vehicle/add", (req, res) => {
    let newVehicle = req.body;
    vehicles.push(newVehicle);
    res.status(201);
    res.send("Vehicle added");
});
app.get("/vehicle/search/:model", (req, res) => {
    let model = req.params.model;
    let found = false;
    vehicles.forEach(vehicle => {
        if (vehicle.model == model) {
            found = true;
            res.send(vehicle);
        }
    });
    if (!found) {
        res.status(404);
    }
});
app.listen(port, () => {
    console.log("Server running on port:" + port);
});
