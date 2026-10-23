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
    <div className="space-y-4 max-w-6xl mx-auto">
      <div className="border-b border-[#E0E0E0] pb-3">
        <h1 className="text-xl font-bold uppercase tracking-wider text-[#212121]">
          MESSAGES
        </h1>
        <p className="text-xs text-[#666666] mt-0.5">
          Encrypted 1-to-1 professional dialogue, service coordination, and referral briefings.
        </p>
      </div>

      {/* Screen 17: Two-column Desktop Layout */}
      <div className="bg-white border border-[#E0E0E0] rounded-xl overflow-hidden shadow-xs grid grid-cols-1 md:grid-cols-12 min-h-[580px]">
        {/* Left Column: Conversations List */}
        <div className="md:col-span-4 border-r border-[#E0E0E0] bg-[#FAFAFA] flex flex-col">
          <div className="p-3.5 border-b border-[#E0E0E0] bg-white">
            <span className="text-xs font-bold uppercase tracking-wider text-[#666666]">
              CONVERSATIONS
            </span>
          </div>

          <div className="divide-y divide-[#E0E0E0] overflow-y-auto flex-1">
            {conversations.map((conv) => {
              const isActive = conv.id === activeConvId
              return (
                <div
                  key={conv.id}
                  onClick={() => setActiveConvId(conv.id)}
                  className={`p-3.5 cursor-pointer transition-colors ${
                    isActive ? 'bg-white border-l-4 border-[#0D47A1]' : 'hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <span className="text-xs font-bold text-[#212121]">{conv.advocate}</span>
                    <span className="text-[10px] text-[#666666]">{conv.time}</span>
                  </div>
                  <p className="text-[11px] text-[#546E7A] mt-0.5">{conv.role}</p>

                  {conv.isServiceRequest && (
                    <div className="mt-1.5 inline-flex items-center text-[10px] font-semibold text-[#0D47A1] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      <Scale className="w-3 h-3 mr-1" />
                      SERVICE REQUEST
                    </div>
                  )}

                  <p className="text-xs text-[#666666] mt-1.5 truncate leading-tight">
                    {conv.lastMessage}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right Column: Active Conversation Thread */}
        <div className="md:col-span-8 flex flex-col bg-white">
          {/* Conversation Header */}
          <div className="p-3.5 border-b border-[#E0E0E0] flex items-center justify-between bg-slate-50/50">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#212121]">
                CONVERSATION WITH {activeConversation.advocate.toUpperCase()}
              </h2>
              <span className="text-[11px] text-[#546E7A]">{activeConversation.role}</span>
            </div>
            {activeConversation.isServiceRequest && (
              <span className="text-xs font-medium text-[#2E7D32] bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                Service Matter In Coordination
              </span>
            )}
          </div>

          {/* Messages Thread */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#FAFAFA]/40">
            {currentMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <span className="text-[10px] font-bold text-[#666666] mb-1">
                  {msg.sender === 'user' ? 'YOU' : activeConversation.advocate.toUpperCase()} • {msg.time}
                </span>
                <div
                  className={`max-w-md p-3 rounded-lg text-xs leading-relaxed border ${
                    msg.sender === 'user'
                      ? 'bg-blue-50/70 border-blue-200 text-[#0D47A1]'
                      : 'bg-white border-[#E0E0E0] text-[#212121]'
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
            className="p-3 border-t border-[#E0E0E0] bg-white flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-3.5 py-2 text-xs border border-[#E0E0E0] rounded-md focus:outline-none focus:ring-1 focus:ring-[#0D47A1] text-[#212121]"
            />
            <Button
              type="submit"
              size="sm"
              className="h-8 px-4 bg-[#0D47A1] text-white hover:bg-[#0B3C8A] rounded-md text-xs font-medium"
            >
              [ SEND ]
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-8 text-xs border-[#546E7A] text-[#546E7A]"
            >
              [ OFFER SERVICE ]
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
