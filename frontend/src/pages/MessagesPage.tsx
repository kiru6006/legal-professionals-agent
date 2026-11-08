import React, { useState } from 'react'
import { Scale } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface Conversation {
  id: string
  advocate: string
  role: string
  lastMessage: string
  time: string
  unread: boolean
  isServiceRequest?: boolean
  serviceDetails?: string
}

export const MessagesPage: React.FC = () => {
  const [conversations] = useState<Conversation[]>([
    {
      id: 'conv1',
      advocate: 'Adv. Ramesh Kumar',
      role: 'Senior Advocate (Chennai)',
      lastMessage: 'Corporate, import-export business. Disputed payment. Timeline is 3 weeks.',
      time: '1 hour ago',
      unread: false,
    },
    {
      id: 'conv2',
      advocate: 'Adv. Sanjay Kumar',
      role: 'Advocate (Salem)',
      lastMessage: 'Court appearance request in Salem Sessions Court',
      time: '2 hours ago',
      unread: true,
      isServiceRequest: true,
      serviceDetails: 'Sessions Court matter (Bail & trial argument)',
    },
    {
      id: 'conv3',
      advocate: 'Adv. Priya Sharma',
      role: 'Advocate (Bangalore)',
      lastMessage: 'Thank you for sharing the citation from High Court.',
      time: '1 day ago',
      unread: false,
    },
    {
      id: 'conv4',
      advocate: 'Adv. Anand Reddy',
      role: 'Advocate (Chennai)',
      lastMessage: 'Drafting Caveat Petition for commercial appeal.',
      time: '3 days ago',
      unread: false,
    },
  ])

  const [activeConvId, setActiveConvId] = useState<string>('conv1')
  const [inputMessage, setInputMessage] = useState('')
  const [threadMessages, setThreadMessages] = useState<
    Record<string, Array<{ sender: 'user' | 'peer'; text: string; time: string }>>
  >({
    conv1: [
      {
        sender: 'peer',
        text: "I've got a Sessions matter in Salem (criminal appeal). Can you handle local counsel?",
        time: '2 hours ago',
      },
      {
        sender: 'user',
        text: "Happy to help, Adv. Ramesh. What's the client and brief?",
        time: '1 hour ago',
      },
      {
        sender: 'peer',
        text: 'Corporate, import-export business. Disputed payment and secondary proceedings. Timeline is 3 weeks.',
        time: '1 hour ago',
      },
    ],
    conv2: [
      {
        sender: 'peer',
        text: 'Adv. Kirubakaran, requesting your assistance for court appearance on Monday before Principal Sessions Court, Salem.',
        time: '2 hours ago',
      },
    ],
  })

  const activeConversation =
    conversations.find((c) => c.id === activeConvId) || conversations[0]

  const currentMessages = threadMessages[activeConvId] || []

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputMessage.trim()) return

    const newMsg = {
      sender: 'user' as const,
      text: inputMessage.trim(),
      time: 'Just now',
    }

    setThreadMessages({
      ...threadMessages,
      [activeConvId]: [...currentMessages, newMsg],
    })
    setInputMessage('')
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="border-b border-[#DADCE0] pb-6">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#C70234] bg-[#FCE8EF] px-2 py-0.5 rounded border border-[#C70234]/20">
            01 · ENCRYPTED CONSULTATION
          </span>
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#80868B]">
            MESSAGING & REFERRALS
          </span>
        </div>
        <h1 className="text-3xl font-editorial text-[#202124] font-normal tracking-tight">
          Professional <span className="italic font-serif text-[#C70234]">Messages</span>
        </h1>
        <p className="text-xs text-[#5F6368] mt-1">
          Encrypted 1-to-1 professional dialogue, service coordination, and referral briefings.
        </p>
      </div>

      {/* Two-column Layout */}
      <div className="bg-white border border-[#DADCE0] border-t-4 border-t-[#C70234] rounded-2xl overflow-hidden shadow-sm grid grid-cols-1 md:grid-cols-12 min-h-[580px]">
        {/* Left Column: Conversations List */}
        <div className="md:col-span-4 border-r border-[#DADCE0] bg-[#F8F9FA] flex flex-col">
          <div className="p-4 border-b border-[#DADCE0] bg-white">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#80868B]">
              CONVERSATIONS ({conversations.length})
            </span>
          </div>

          <div className="divide-y divide-[#DADCE0] overflow-y-auto flex-1">
            {conversations.map((conv) => {
              const isActive = conv.id === activeConvId
              return (
                <div
                  key={conv.id}
                  onClick={() => setActiveConvId(conv.id)}
                  className={`p-4 cursor-pointer transition-all ${isActive
                      ? 'bg-white border-l-4 border-l-[#1A73E8] shadow-xs'
                      : 'hover:bg-[#F1F3F4]'
                    }`}
                >
                  <div className="flex items-start justify-between">
                    <span className="text-xs font-bold text-[#202124]">{conv.advocate}</span>
                    <span className="text-[10px] text-[#80868B]">{conv.time}</span>
                  </div>
                  <p className="text-[11px] text-[#5F6368] mt-0.5">{conv.role}</p>

                  {conv.isServiceRequest && (
                    <div className="mt-1.5 inline-flex items-center text-[10px] font-bold text-[#C70234] bg-[#FCE8EF] px-2 py-0.5 rounded-full border border-[#C70234]/20">
                      <Scale className="w-3 h-3 mr-1" />
                      SERVICE REQUEST
                    </div>
                  )}

                  <p className="text-xs text-[#5F6368] mt-1.5 truncate leading-tight">
                    {conv.lastMessage}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right Column: Active Thread */}
        <div className="md:col-span-8 flex flex-col bg-white">
          {/* Header */}
          <div className="p-4 border-b border-[#DADCE0] flex items-center justify-between bg-white">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#202124]">
                CONVERSATION WITH {activeConversation.advocate.toUpperCase()}
              </h2>
              <span className="text-[11px] text-[#5F6368]">{activeConversation.role}</span>
            </div>
            {activeConversation.isServiceRequest && (
              <span className="text-xs font-semibold text-[#188038] bg-[#E6F4EA] px-2.5 py-1 rounded-full border border-[#34A853]/30">
                Active Service Matter
              </span>
            )}
          </div>

          {/* Messages Thread */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-[#F5F7FB]">
            {currentMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'
                  }`}
              >
                <span className="text-[10px] font-bold text-[#80868B] mb-1">
                  {msg.sender === 'user' ? 'YOU' : activeConversation.advocate.toUpperCase()} • {msg.time}
                </span>
                <div
                  className={`max-w-md p-3.5 rounded-2xl text-xs leading-relaxed shadow-xs ${msg.sender === 'user'
                      ? 'bg-[#1A73E8] text-white rounded-br-xs'
                      : 'bg-white border border-[#DADCE0] text-[#202124] rounded-bl-xs'
                    }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Message Input & Action Bar */}
          <form
            onSubmit={handleSendMessage}
            className="p-3.5 border-t border-[#DADCE0] bg-white flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-3.5 py-2.5 text-xs bg-white border border-[#DADCE0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A73E8] focus:border-[#1A73E8] text-[#202124] placeholder-[#80868B]"
            />
            <Button
              type="submit"
              variant="primary"
              size="sm"
              className="h-9 px-4 text-xs font-semibold"
            >
              SEND
            </Button>
            <Button
              type="button"
              variant="brand"
              size="sm"
              className="h-9 text-xs"
            >
              Offer Service
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
