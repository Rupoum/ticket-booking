"use client"
import { atom } from "recoil";

export const authstate=atom({
	key:'authState',
	default:{
		isAuthinticated:false,
		user:null
	}
});