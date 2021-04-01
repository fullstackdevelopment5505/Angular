// Section 1
import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'
import { User } from './../models/user.model'

// Section 2
export const UPDATE_USER       = '[USER] Update'

// Section 3
export class UpdateUser implements Action {
    readonly type = UPDATE_USER

    constructor(public payload: User) {}
}

export type Actions = UpdateUser