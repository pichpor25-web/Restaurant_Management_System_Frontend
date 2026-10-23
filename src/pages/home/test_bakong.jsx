import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import {
  createBakongTestOrder,
  createBakongCheckout,
  verifyBakongPayment,
} from "../../services/paymentService.js";

const DEFAULT_API_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";

const TestBakong = () => {
  const [apiUrl, setApiUrl] = useState(DEFAULT_API_URL);
  const [orderId, setOrderId] = useState("");
  const [testAmount, setTestAmount] = useState("1.00");
  const [testOrder, setTestOrder] = useState(null);
  const [token, setToken] = useState("");
  const [payment, setPayment] = useState(null);
  const [error, setError] = useState("");
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isCreatingTestOrder, setIsCreatingTestOrder] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleCheckout = async (event) => {
    event.preventDefault();
    setError("");
    setPayment(null);

    if (!orderId.trim()) {
      setError("Enter an order ID to continue.");
      return;
    }

    setIsCheckingOut(true);

    try {
      const data = await createBakongCheckout(orderId.trim(), {
        baseURL: apiUrl,
        token,
      });

      if (!data.qr || !data.md5) {
        throw new Error(
          "Checkout response did not include a QR payload and transaction MD5.",
        );
      }

      setPayment(data);
    } catch (requestError) {
      setError(
        requestError.message === "Order not found"
          ? "Order not found. Create a local test order above or enter an existing order ID."
          : requestError.message || "Unable to create the Bakong payment.",
      );
    } finally {
      setIsCheckingOut(false);
    }
  };

  const handleCreateTestOrder = async () => {
    setError("");

    const amountValue = Number(testAmount);
    if (!Number.isFinite(amountValue) || amountValue <= 0) {
      setError("Enter a test order amount greater than zero.");
      return;
    }

    setIsCreatingTestOrder(true);

    try {
      const data = await createBakongTestOrder(amountValue, {
        baseURL: apiUrl,
        token,
      });
      setOrderId(String(data.id));
      setTestOrder(data);
      setPayment(null);
    } catch (requestError) {
      setError(requestError.message || "Unable to create a local test order.");
    } finally {
      setIsCreatingTestOrder(false);
    }
  };

  const handleVerify = async () => {
    setError("");
    setIsVerifying(true);

    try {
      const data = await verifyBakongPayment(payment.md5, {
        baseURL: apiUrl,
        token,
      });

      setPayment((currentPayment) => ({
        ...currentPayment,
        paid: data.paid,
      }));
    } catch (requestError) {
      setError(requestError.message || "Unable to verify the Bakong payment.");
    } finally {
      setIsVerifying(false);
    }
  };

  const orderAmount =
    payment?.amount ??
    (testOrder && String(testOrder.id) === orderId ? testOrder.total : null);
  const amount = orderAmount != null ? Number(orderAmount).toFixed(2) : null;

  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_#ecfdf5_0%,_#f8fafc_42%,_#f1f5f9_100%)] px-4 py-8 font-sans text-slate-900 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-emerald-700">
              Payment integration
            </p>
            <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Test a Bakong payment
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
              Create a KHQR payment for an existing order, scan it with Bakong,
              and verify the result.
            </p>
          </div>
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-4 py-2 text-sm font-semibold text-emerald-800 shadow-sm">
            <span className="size-2 rounded-full bg-emerald-500" /> Bakong KHQR
            enabled
          </div>
        </div>
        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,1.05fr)] lg:gap-8">
          <form
            className="flex w-full flex-col overflow-hidden rounded-3xl border border-white bg-white shadow-[0_24px_70px_-28px_rgba(15,23,42,0.28)] ring-1 ring-slate-200/70"
            onSubmit={handleCheckout}
          >
            <header className="border-b border-slate-100 bg-gradient-to-br from-white to-emerald-50/60 px-6 pb-6 pt-7 sm:px-8">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold tracking-[0.18em] text-slate-400">
                  ORDER DETAILS
                </span>
                <span className="rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                  BAKONG KHQR
                </span>
              </div>

              <div className="mt-5 flex items-center justify-between gap-4">
                <div>
                  <label
                    className="mb-1 block text-xs font-medium text-slate-400"
                    htmlFor="order-id"
                  >
                    Order ID
                  </label>
                  <input
                    id="order-id"
                    className="w-44 border-0 bg-transparent p-0 text-3xl font-extrabold tracking-tight outline-none placeholder:text-slate-300 focus:ring-0 sm:text-4xl"
                    type="number"
                    min="1"
                    step="1"
                    value={orderId}
                    onChange={(event) => {
                      setOrderId(event.target.value);
                      setPayment(null);
                      setTestOrder(null);
                    }}
                    placeholder="# —"
                    aria-label="Order ID"
                  />
                </div>
                <span className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600">
                  Existing order
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-500">
                Payment for the order selected in your restaurant system.
              </p>
              <div className="mt-5 rounded-2xl border border-emerald-100 bg-white/80 p-4">
                <p className="text-sm font-bold text-slate-800">
                  Need an order to test?
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Create a local unpaid test order with the amount you want to
                  charge.
                </p>
                <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                  <label className="relative flex min-w-0 flex-1 items-center">
                    <span className="absolute left-3 text-sm font-semibold text-slate-400">
                      $
                    </span>
                    <input
                      className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-8 pr-3 text-sm font-semibold outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15"
                      type="number"
                      min="0.01"
                      step="0.01"
                      value={testAmount}
                      onChange={(event) => setTestAmount(event.target.value)}
                      aria-label="Test order amount in US dollars"
                    />
                  </label>
                  <button
                    className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm font-bold text-emerald-800 transition hover:bg-emerald-100 disabled:cursor-wait disabled:opacity-60"
                    type="button"
                    onClick={handleCreateTestOrder}
                    disabled={isCreatingTestOrder}
                  >
                    {isCreatingTestOrder
                      ? "Creating order…"
                      : "Create test order"}
                  </button>
                </div>
              </div>
            </header>

            <section
              className="flex-1 px-6 py-7 sm:px-8"
              aria-label="Order summary"
            >
              <div className="mb-4 flex items-center justify-between text-sm font-semibold">
                <h2>Order summary</h2>
                <span className="text-slate-400">1 order</span>
              </div>

              <div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
                <div className="min-w-0">
                  <p className="truncate font-bold">Restaurant order</p>
                  <p className="mt-1 text-sm text-slate-500">
                    Order {orderId || "—"}
                  </p>
                </div>
                <p className="shrink-0 font-bold text-rose-600">
                  {amount ? `$${amount}` : "—"}
                </p>
              </div>
            </section>

            <footer className="border-t border-slate-100 bg-slate-50/40 px-6 pb-7 pt-5 sm:px-8">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-slate-500">
                  <span>Order total</span>
                  <span className="font-semibold text-slate-800">
                    {amount ? `$${amount}` : "Provided by the order"}
                  </span>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <span className="text-sm text-slate-500">Payment</span>
                <span className="flex items-center gap-2 text-sm font-bold">
                  <span className="grid size-5 place-items-center rounded bg-emerald-100 text-xs text-emerald-700">
                    $
                  </span>
                  Bakong KHQR
                </span>
              </div>

              {error && (
                <p
                  className="mt-4 rounded-lg bg-red-50 p-3 text-sm leading-relaxed text-red-800"
                  role="alert"
                >
                  {error}
                </p>
              )}

              {!payment?.paid && (
                <button
                  className="mt-5 min-h-12 w-full rounded-xl bg-emerald-700 px-5 font-bold text-white shadow-lg shadow-emerald-900/15 transition hover:-translate-y-0.5 hover:bg-emerald-800 hover:shadow-xl disabled:cursor-wait disabled:opacity-60 disabled:hover:translate-y-0"
                  type="submit"
                  disabled={isCheckingOut}
                >
                  {isCheckingOut
                    ? "Preparing payment…"
                    : payment
                      ? "Refresh payment QR"
                      : "Place Order"}
                </button>
              )}

              <details className="mt-4">
                <summary className="cursor-pointer text-center text-xs font-semibold text-slate-400 hover:text-slate-600">
                  API connection settings
                </summary>
                <div className="mt-4 grid gap-3">
                  <label className="grid gap-1.5 text-xs font-semibold text-slate-600">
                    API base URL
                    <input
                      className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm font-normal outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15"
                      type="url"
                      value={apiUrl}
                      onChange={(event) => setApiUrl(event.target.value)}
                      placeholder="http://127.0.0.1:8000/api"
                    />
                  </label>
                  <label className="grid gap-1.5 text-xs font-semibold text-slate-600">
                    Bearer token (optional in local test mode)
                    <input
                      className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm font-normal outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15"
                      type="password"
                      value={token}
                      onChange={(event) => setToken(event.target.value)}
                      placeholder="Only required when your API uses authentication"
                      autoComplete="off"
                    />
                  </label>
                </div>
              </details>
            </footer>
          </form>

          {payment ? (
            <section
              className="overflow-hidden rounded-3xl border border-white bg-white shadow-[0_24px_70px_-28px_rgba(15,23,42,0.28)] ring-1 ring-slate-200/70 lg:sticky lg:top-8"
              aria-live="polite"
            >
              <div
                className={`px-6 py-6 text-center text-white ${
                  payment.paid ? "bg-emerald-700" : "bg-slate-900"
                }`}
              >
                <p className="text-sm font-semibold tracking-wide text-white/70">
                  {payment.paid ? "PAYMENT COMPLETE" : "SCAN TO PAY"}
                </p>
                <h2 className="mt-1 text-xl font-bold">
                  {payment.paid ? "Payment confirmed" : "Bakong KHQR"}
                </h2>
              </div>
              <div className="grid justify-items-center px-6 py-8 text-center sm:px-8">
                <p className="mb-5 max-w-xs text-sm leading-6 text-slate-500">
                  Open the Bakong app and scan this code to complete your
                  payment.
                </p>
                <div className="rounded-[1.75rem] border border-slate-100 bg-white p-4 shadow-[0_12px_35px_-20px_rgba(15,23,42,0.4)]">
                  <QRCodeSVG
                    value={payment.qr}
                    size={240}
                    level="M"
                    includeMargin
                  />
                </div>
                <p className="mt-4 text-sm text-slate-500">
                  Order {payment.order_number || payment.order_id || orderId}
                </p>
                {amount && (
                  <p className="mt-1 text-2xl font-extrabold">
                    ${amount}{" "}
                    <span className="text-base font-semibold">USD</span>
                  </p>
                )}
                <p
                  className={`my-4 rounded-full px-4 py-2 text-sm font-semibold ${
                    payment.paid
                      ? "bg-emerald-50 text-emerald-800"
                      : "bg-amber-50 text-amber-800"
                  }`}
                >
                  {payment.paid
                    ? "Paid"
                    : "Waiting for payment — scan with Bakong"}
                </p>
                {!payment.paid && (
                  <button
                    className="min-h-11 w-full rounded-xl bg-emerald-700 px-5 font-bold text-white transition hover:bg-emerald-800 disabled:cursor-wait disabled:opacity-60"
                    type="button"
                    onClick={handleVerify}
                    disabled={isVerifying}
                  >
                    {isVerifying ? "Checking…" : "I have paid — check status"}
                  </button>
                )}
              </div>
            </section>
          ) : (
            <section className="flex min-h-[380px] flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300/80 bg-white/55 px-8 py-12 text-center shadow-inner lg:sticky lg:top-8">
              <div className="mb-5 grid size-20 place-items-center rounded-3xl bg-emerald-100 text-emerald-700 shadow-sm">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="size-10"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 5.5A2.5 2.5 0 0 1 5.5 3h13A2.5 2.5 0 0 1 21 5.5v13a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 18.5v-13Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 7h3v3H7zm7 0h3v3h-3zM7 14h3v3H7zm7 0h3v3h-3z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-slate-900">
                Your payment QR will appear here
              </h2>
              <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                Connect your backend, then create a payment for an existing
                unpaid order. The returned KHQR and amount will appear here.
              </p>
              <ol className="mt-7 grid w-full max-w-sm gap-3 text-left text-sm text-slate-600">
                <li className="flex gap-3">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-800">
                    1
                  </span>
                  <span>
                    Open API connection settings and enter your API URL. Local
                    test mode does not need a login token.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-800">
                    2
                  </span>
                  <span>
                    Create a local test order above, or enter an existing unpaid
                    order ID, then choose <strong>Place Order</strong>.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-800">
                    3
                  </span>
                  <span>
                    Scan the KHQR with Bakong, complete payment, then choose{" "}
                    <strong>I have paid — check status</strong>.
                  </span>
                </li>
              </ol>
              <div className="mt-7 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                <span className="h-px w-8 bg-slate-200" /> Secure KHQR payment{" "}
                <span className="h-px w-8 bg-slate-200" />
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
  );
};

export default TestBakong;
