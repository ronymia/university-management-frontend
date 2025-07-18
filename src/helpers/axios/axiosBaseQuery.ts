import { IGenericErrorResponse, IMeta } from '@/types';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import type { AxiosRequestConfig, AxiosError } from 'axios';
import { instance as axiosInstance } from './axiosInstance';

export const axiosBaseQuery =
    (
        { baseUrl }: { baseUrl: string } = { baseUrl: '' },
    ): BaseQueryFn<
        {
            url: string;
            method: AxiosRequestConfig['method'];
            data?: AxiosRequestConfig['data'];
            params?: AxiosRequestConfig['params'];
            meta?: IMeta;
            contentType?: string;
        },
        unknown,
        unknown
    > =>
    async ({ url, method, data, params, contentType }) => {
        try {
            const result = await axiosInstance({
                url: baseUrl + url,
                method,
                data,
                params,
                headers: {
                    'Content-Type': contentType || 'application/json',
                },
                withCredentials: true,
            });
            return result;
        } catch (axiosError) {
            const err = axiosError as AxiosError;
            // console.log({ err });
            const data = err?.response?.data as IGenericErrorResponse;
            const responseObject: IGenericErrorResponse = {
                statusCode: err?.response?.status || 500,
                message: data?.message || 'Something went wrong',
                errorMessages: data?.errorMessages || [],
            };
            return { error: responseObject };
        }
    };
