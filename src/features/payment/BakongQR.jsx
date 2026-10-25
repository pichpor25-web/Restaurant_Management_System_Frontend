import { QRCodeSVG } from 'qrcode.react'
import Button from '../../components/ui/Button.jsx'

const BakongQR = ({ payment, onVerify, verifying }) => (
  <div className="grid justify-items-center gap-4 text-center">
    <p className="text-sm text-slate-500">Open the Bakong app and scan this code to pay.</p>
    <div className="rounded-3xl border border-slate-100 bg-white p-4 shadow">
      <QRCodeSVG value={payment.qr} size={240} level="M" marginSize={2} />
    </div>
    <p className={`rounded-full px-4 py-2 text-sm font-semibold ${payment.paid ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-800'}`}>
      {payment.paid ? 'Paid' : 'Waiting for payment — scan with Bakong'}
    </p>
    {!payment.paid && (
      <Button className="w-full" onClick={onVerify} disabled={verifying}>
        {verifying ? 'Checking…' : 'I have paid — check status'}
      </Button>
    )}
  </div>
)

export default BakongQR
