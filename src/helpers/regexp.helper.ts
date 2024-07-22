
export const passwordPatt = new RegExp(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/);

export const fullTextPatt = new RegExp(/^[a-záéíóúüñ\-\'\.\,\s\d]{0,200}$/i);

export const fullTextWithoutSpacePatt = new RegExp(/^[a-záéíóúüñ]{0,200}$/i);

export const fullTextNumberPatt = new RegExp(/^[a-zA-ZáéíóúüÁÉÍÓÚÜñÑ\d\.\,\s]{0,200}$/);

export const numberPatt = new RegExp(/^[0-9]{0,10}$/i);

export const isoThreePatt = new RegExp(/^[a-z]{2,3}$/i);

export const codePatt = new RegExp(/^[a-zA-Z]{2,10}$/);

export const datePatt = new RegExp(/^[\d]{4,4}\-[\d]{2,2}\-[\d]{2,2}$/);

export const emailPatt = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

export const bankAccountPath = new RegExp(/^\d{9,22}$/);
