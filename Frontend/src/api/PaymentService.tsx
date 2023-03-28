import axios from "axios";
import { Payment, PutPayment, PutCollected } from "./dataTypes";

const PAYMENT_BASE_URL = "http://localhost:8080/payment";

class PaymentService {

    getAllPayments(id: string) {
      return axios.get(PAYMENT_BASE_URL+"/getAllPayments/"+id);
    }

    getAllCollectedPayments(id: string) {
      return axios.get(PAYMENT_BASE_URL+"/getAllCollectedPayments/"+id);
    }

    getAllUnCollectedPayments(id: string) {
      return axios.get(PAYMENT_BASE_URL+"/getAllUnCollectedPayments/"+id);
    }

    getPaymentById(id: string) {
      return axios.get(PAYMENT_BASE_URL+"/getPaymentById/"+id);
    }

    getPaymentsByDriverId(id: string) {
      return axios.get(PAYMENT_BASE_URL+"/getPaymentsByDriverId/"+id);
    }

    postPayment(payment: Payment) {
      return axios.post(PAYMENT_BASE_URL + "/postPayment/", payment);
    }

    putPayment(id: string, putPayment: PutPayment) {
      return axios.put(PAYMENT_BASE_URL+"/putPayment/"+id, putPayment);
    }

    putCollected(id: string, putCollected: PutCollected) {
      return axios.put(PAYMENT_BASE_URL+"/putCollected/"+id, putCollected);
    }

    deletePayment(id: string) {
      return axios.delete(PAYMENT_BASE_URL + "/deletePayment/" + id);
    }
  
  }
  
  export default new PaymentService();