import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class Notify {
  static TOASTIFY_SETTINGS = {
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  static buildContent = (title: string, description: string) => {
    return (
      <>
        <h3>{title}</h3>
        <p>{description}</p>
      </>
    );
  };

  static success(description: string, title?: string) {
    // console.log('Entered success');
    toast.success(
      this.buildContent(title ? title : 'Success', description),
      this.TOASTIFY_SETTINGS,
    );
  }

  static error(description: string, title?: string) {
    toast.error(
      this.buildContent(title ? title : 'Error', description),
      this.TOASTIFY_SETTINGS,
    );
  }

  static warning(description: string, title?: string) {
    toast.warning(
      this.buildContent(title ? title : 'Warning', description),
      this.TOASTIFY_SETTINGS,
    );
  }

  static info(description: string, title?: string) {
    toast.dark(
      this.buildContent(title ? title : 'Info', description),
      this.TOASTIFY_SETTINGS,
    );
  }

  static dark(description: string, title?: string) {
    toast.dark(
      this.buildContent(title ? title : 'Dark', description),
      this.TOASTIFY_SETTINGS,
    );
  }
}
