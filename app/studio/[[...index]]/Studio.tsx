"use client"

import "./polyfills"

import config from "@/sanity.config"
import {NextStudio} from "next-sanity/studio"

export default function Studio() {
  return <NextStudio config={config} />
}
