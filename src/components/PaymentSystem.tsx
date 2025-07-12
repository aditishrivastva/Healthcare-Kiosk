import React, { useState } from 'react';
import { CreditCard, Smartphone, Banknote, CheckCircle } from 'lucide-react';

interface Payment {
  id: string;
  patientName: string;
  amount: number;
  method: string;
  status: string;
  date: string;
}

const PaymentSystem: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [amount, setAmount] = useState<number>(500);
  const [patientName, setPatientName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [processing, setProcessing] = useState(false);

  const paymentMethods = [
    { id: 'upi', name: 'UPI Payment', icon: Smartphone, description: 'Pay with Phone Pe, Google Pay', color: 'bg-green-500' },
    { id: 'card', name: 'Card Payment', icon: CreditCard, description: 'Credit/Debit Card', color: 'bg-blue-500' },
    { id: 'cash', name: 'Cash Payment', icon: Banknote, description: 'Pay at counter', color: 'bg-purple-500' },
  ];

  const handlePayment = async () => {
    if (!patientName || amount <= 0) {
      alert('Please fill all fields');
      return;
    }

    setProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    const newPayment: Payment = {
      id: Date.now().toString(),
      patientName,
      amount,
      method: paymentMethod,
      status: 'Completed',
      date: new Date().toLocaleDateString(),
    };

    setPayments([newPayment, ...payments]);
    setPatientName('');
    setAmount(500);
    setProcessing(false);
    alert('Payment successful!');
  };

  const totalRevenue = payments.reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Payment Processing System</h2>
        <p className="text-gray-600">Handle medical bill payments</p>
      </div>

      {/* Payment Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-green-600">₹{totalRevenue.toLocaleString()}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Payments</p>
              <p className="text-2xl font-bold text-blue-600">{payments.length}</p>
            </div>
            <CreditCard className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Average Bill</p>
              <p className="text-2xl font-bold text-purple-600">
                ₹{payments.length > 0 ? Math.round(totalRevenue / payments.length) : 0}
              </p>
            </div>
            <Banknote className="h-8 w-8 text-purple-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payment Form */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Make Payment</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Patient Name
              </label>
              <input
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter patient name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amount (₹)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Payment Method
              </label>
              <div className="grid grid-cols-3 gap-3">
                {paymentMethods.map((method) => {
                  const Icon = method.icon;
                  return (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`p-3 rounded-lg border-2 transition-colors ${
                        paymentMethod === method.id
                          ? `${method.color} bg-opacity-10 border-current text-current`
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Icon className={`h-6 w-6 mx-auto mb-1 ${
                        paymentMethod === method.id ? '' : 'text-gray-400'
                      }`} />
                      <p className="text-xs font-medium">{method.name}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              onClick={handlePayment}
              disabled={processing}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
            >
              {processing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <CreditCard className="h-4 w-4" />
                  <span>Pay ₹{amount}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Payment History */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Payments</h3>
          
          {payments.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <CreditCard className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No payments yet</p>
              <p className="text-sm">Process your first payment to see history</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {payments.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{payment.patientName}</p>
                    <p className="text-sm text-gray-600">{payment.method.toUpperCase()} • {payment.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">₹{payment.amount}</p>
                    <p className="text-xs text-green-500">{payment.status}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentSystem;

