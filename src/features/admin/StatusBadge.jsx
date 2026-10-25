import Badge from '../../components/ui/Badge.jsx'

const tone = {
  pending: 'amber', confirmed: 'green', preparing: 'amber', ready: 'green',
  completed: 'green', cancelled: 'red', available: 'green', occupied: 'red', reserved: 'amber',
}

const StatusBadge = ({ status }) => <Badge tone={tone[status] ?? 'slate'}>{status}</Badge>

export default StatusBadge
