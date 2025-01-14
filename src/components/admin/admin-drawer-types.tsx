import { ReactElement } from "react"

export interface DrawerLinkType {
  text:string
  Icon:ReactElement
  link:string
  isExpandable?:boolean
}

export interface ItemPropsType extends DrawerLinkType { index:number }