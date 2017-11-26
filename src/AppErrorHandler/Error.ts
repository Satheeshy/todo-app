import { Router } from '@angular/router';
import { ErrorHandler } from "@angular/core";


export class MyErrorHandler implements ErrorHandler{

  
    handleError(error: any): void {
        alert('An error occured');    
        throw error;
    }

}