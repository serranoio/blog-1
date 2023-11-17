import { Routes } from "./api"

export const TABS = ["Blog"]


export const SiteName = Routes.slice(8,Routes.length).split(".")[0]


export const colors = new Map();
colors.set("red", "#af575a")
colors.set("red-1", "#62b3b2")
colors.set("orange", "#ec9960")
colors.set("orange-1", "#006d9c")
colors.set("yellow", "#4fa484")
colors.set("yellow-1", "#f8be34")
colors.set("purple", "#5a4575")
colors.set("purple-1", "#708794")
colors.set("blue", "#294e70")
colors.set("blue-1", "#b6c75a")

export const makeColorChange = (color: string) => {
    document.documentElement.style.setProperty("--primary", colors.get(color));
    document.documentElement.style.setProperty("--secondary", colors.get(color + "-1"));
}