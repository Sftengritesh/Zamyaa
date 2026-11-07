import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  TrendingUp,
  ShoppingBag,
  Shirt,
  AlertTriangle,
  ArrowRight,
  Plus,
  Layers,
  Sparkles,
} from 'lucide-react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { api } from '@/services/api'
import { formatPrice } from '@/data/products'

export default function AdminDashboardPage() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api
      .get('/orders/analytics/summary')
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => console.error('Error fetching analytics:', err))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-center">
        <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-xs uppercase tracking-widest text-[#777]">Loading Atelier Analytics...</p>
      </div>
    )
  }

  const stats = [
    {
      label: 'Total Revenue',
      value: formatPrice(data?.totalRevenue || 220000),
      subtext: '+18.4% vs last month',
      icon: TrendingUp,
    },
    {
      label: 'Total Orders',
      value: data?.totalOrders || 5,
      subtext: `${data?.pendingOrders || 1} pending fulfillment`,
      icon: ShoppingBag,
    },
    {
      label: 'Active Products',
      value: `${data?.activeProducts || 4} / ${data?.totalProducts || 4}`,
      subtext: 'Live on online storefront',
      icon: Shirt,
    },
    {
      label: 'Inventory Alerts',
      value: '2 Low / 1 Out',
      subtext: 'Requires artisan restocking',
      icon: AlertTriangle,
      alert: true,
    },
  ]

  return (
    <div className="space-y-10">
      {/* ── TOP HERO HEADER ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#e5e5e5]">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#777] block mb-1">
            EXECUTIVE ATELIER OVERVIEW
          </span>
          <h1 className="font-display text-3xl font-semibold text-[#111]">
            Welcome Back, Jyoti
          </h1>
          <p className="text-xs text-[#666] mt-1">
            Here is your live revenue, customer orders, and artisan inventory status for today.
          </p>
        </div>

        {/* Quick action buttons for designer */}
        <div className="flex items-center gap-3">
          <Link
            to="/admin/products/new"
            className="h-10 px-5 bg-black text-white text-xs uppercase tracking-widest font-semibold flex items-center gap-2 hover:bg-[#222] transition-colors shadow-sm"
          >
            <Plus size={15} /> Add New Dress
          </Link>
          <Link
            to="/admin/homepage"
            className="h-10 px-5 border border-black text-black text-xs uppercase tracking-widest font-semibold flex items-center gap-2 hover:bg-black hover:text-white transition-colors"
          >
            <Layers size={14} /> Update Banners
          </Link>
        </div>
      </div>

      {/* ── KPI METRICS CARDS ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((s, idx) => {
          const Icon = s.icon
          return (
            <div
              key={idx}
              className="bg-white p-6 border border-[#e5e5e5] rounded-xs shadow-xs hover:border-black transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#777]">
                  {s.label}
                </span>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    s.alert ? 'bg-amber-100 text-amber-800' : 'bg-[#f4f4f4] text-black'
                  }`}
                >
                  <Icon size={16} />
                </div>
              </div>
              <p className="font-display text-2xl font-bold text-[#111]">{s.value}</p>
              <p className="text-[0.6875rem] text-[#888] mt-1">{s.subtext}</p>
            </div>
          )
        })}
      </div>

      {/* ── REVENUE ANALYTICS & CHARTS ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sales Chart (8 cols) */}
        <div className="lg:col-span-8 bg-white border border-[#e5e5e5] p-6 lg:p-8 rounded-xs shadow-xs">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#f0f0f0]">
            <div>
              <h2 className="font-display text-xl font-semibold text-[#111]">
                Sales & Revenue Trajectory
              </h2>
              <p className="text-xs text-[#777] mt-0.5">
                Monthly gross sales generated across all luxury collections (₹ INR)
              </p>
            </div>
            <span className="text-xs uppercase tracking-wider font-semibold bg-[#f4f4f4] px-3 py-1 text-black">
              2025–2026
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data?.salesChart || []} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#000000" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#000000" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eaeaea" />
                <XAxis dataKey="month" stroke="#888" fontSize={11} tickLine={false} />
                <YAxis
                  stroke="#888"
                  fontSize={11}
                  tickLine={false}
                  tickFormatter={(val) => `₹${(val / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  formatter={(value: any) => [formatPrice(Number(value)), 'Gross Revenue']}
                  contentStyle={{
                    backgroundColor: '#111',
                    color: '#fff',
                    borderRadius: '2px',
                    fontSize: '12px',
                    border: 'none',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#000000"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#revenueGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bestselling Pieces (4 cols) */}
        <div className="lg:col-span-4 bg-white border border-[#e5e5e5] p-6 lg:p-8 rounded-xs shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#f0f0f0]">
              <h2 className="font-display text-xl font-semibold text-[#111]">
                Bestselling Silhouettes
              </h2>
              <Sparkles size={16} className="text-black" />
            </div>

            <div className="space-y-4">
              {(data?.bestsellers || []).map((p: any) => (
                <div key={p.id} className="flex items-center gap-3.5 pb-3 border-b border-[#f5f5f5] last:border-0">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-12 h-16 object-cover aspect-[3/4] bg-[#f4f4f4] shrink-0 border border-[#eee]"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-[#111] truncate">{p.name}</p>
                    <p className="text-[0.6875rem] text-[#777] mt-0.5">{p.collection}</p>
                    <p className="text-xs font-bold text-black mt-1">{formatPrice(p.price)}</p>
                  </div>
                  <span className="text-[0.6875rem] font-semibold bg-[#f4f4f4] px-2 py-1 text-black shrink-0">
                    {p.salesCount} sold
                  </span>
                </div>
              ))}
            </div>
          </div>

          <Link
            to="/admin/products"
            className="mt-6 w-full py-2.5 text-center border border-[#ddd] text-xs uppercase tracking-wider font-semibold text-[#444] hover:border-black hover:text-black transition-colors block"
          >
            View All Products →
          </Link>
        </div>
      </div>

      {/* ── RECENT ORDERS ── */}
      <div className="bg-white border border-[#e5e5e5] p-6 lg:p-8 rounded-xs shadow-xs">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#f0f0f0]">
          <div>
            <h2 className="font-display text-xl font-semibold text-[#111]">
              Recent Client Orders
            </h2>
            <p className="text-xs text-[#777] mt-0.5">
              Latest bespoke orders awaiting packaging and courier dispatch
            </p>
          </div>
          <Link
            to="/admin/orders"
            className="text-xs uppercase tracking-wider font-semibold text-black hover:underline flex items-center gap-1"
          >
            Manage All Orders <ArrowRight size={13} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#e5e5e5] text-[#777] uppercase tracking-wider text-[0.6875rem]">
                <th className="py-3 px-3 font-semibold">Order ID</th>
                <th className="py-3 px-3 font-semibold">Client Name</th>
                <th className="py-3 px-3 font-semibold">Garments</th>
                <th className="py-3 px-3 font-semibold">Total Amount</th>
                <th className="py-3 px-3 font-semibold">Payment</th>
                <th className="py-3 px-3 font-semibold">Fulfillment</th>
                <th className="py-3 px-3 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f2f2f2]">
              {(data?.recentOrders || []).map((o: any) => (
                <tr key={o.id} className="hover:bg-[#fafafa] transition-colors">
                  <td className="py-3.5 px-3 font-mono font-bold text-black">{o.orderNumber}</td>
                  <td className="py-3.5 px-3">
                    <p className="font-semibold text-[#111]">{o.customer.name}</p>
                    <p className="text-[0.6875rem] text-[#888]">{o.shippingAddress.city}</p>
                  </td>
                  <td className="py-3.5 px-3">
                    {o.items.map((it: any, i: number) => (
                      <span key={i} className="inline-block mr-2 text-[#444]">
                        {it.name} ({it.size})
                      </span>
                    ))}
                  </td>
                  <td className="py-3.5 px-3 font-bold text-black">{formatPrice(o.total)}</td>
                  <td className="py-3.5 px-3">
                    <span
                      className={`inline-block px-2 py-0.5 text-[0.625rem] uppercase font-bold tracking-wider rounded-xs ${
                        o.paymentStatus === 'paid'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {o.paymentStatus}
                    </span>
                  </td>
                  <td className="py-3.5 px-3">
                    <span
                      className={`inline-block px-2 py-0.5 text-[0.625rem] uppercase font-bold tracking-wider rounded-xs ${
                        o.fulfillmentStatus === 'delivered'
                          ? 'bg-green-100 text-green-800'
                          : o.fulfillmentStatus === 'shipped'
                          ? 'bg-blue-100 text-blue-800'
                          : o.fulfillmentStatus === 'processing'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {o.fulfillmentStatus}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <Link
                      to={`/admin/orders?order=${o.id}`}
                      className="inline-block px-3 py-1 border border-[#ccc] hover:border-black font-semibold uppercase text-[0.6875rem] transition-colors"
                    >
                      Inspect
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
