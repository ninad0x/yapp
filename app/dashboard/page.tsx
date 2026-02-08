"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useAuth } from "@/hooks/useAuth";
import { useInbox } from "@/hooks/useMessage";
import Link from "next/link"


async function handleLogout() {
  localStorage.removeItem("token")
  window.location.href = "/login"
}

async function handleSendMessage() {
  const textarea = document.getElementById("message") as HTMLTextAreaElement
  const pdfInput = document.getElementById("file") as HTMLInputElement
  
  if (!textarea.value.trim() && !pdfInput.files?.length) return

  const form = new FormData()
  form.append("teacherId", "e089eb01-3e4f-4f73-a6c1-fea092d8f1e9")
  form.append("text", textarea.value)
  
  if (pdfInput.files?.[0]) {
    form.append("pdf", pdfInput.files[0])
  }

  await fetch("/api/messages/send", {
    method: "POST",
    body: form
  })

  textarea.value = ""
  pdfInput.value = "" // Clear file input
}

export default function DashboardPage() {

  const { teacher, loading } = useAuth()
  const { messages } = useInbox(teacher?.id)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b px-6 py-4 flex justify-between items-center">
        <Link href="/">
          <h1 className="text-2xl font-bold text-primary cursor-pointer hover:opacity-80 transition-opacity">
            Yapp
          </h1>
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-md text-gray-800">{teacher?.name}</span>
          <Button onClick={handleLogout} variant="outline" size="sm">Logout</Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-6">
        <Tabs defaultValue="compose" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="parents">Parents</TabsTrigger>
            <TabsTrigger value="compose">Compose</TabsTrigger>
            <TabsTrigger value="inbox">Inbox</TabsTrigger>
          </TabsList>

          {/* Parents Tab */}
          <TabsContent value="parents" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Parents List</h2>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button>+ Add Parent</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Parent</DialogTitle>
                  </DialogHeader>
                  <form className="space-y-4">
                    <div>
                      <Label htmlFor="parent-name">Parent Name</Label>
                      <Input id="parent-name" placeholder="Sunita Sharma" />
                    </div>
                    <div>
                      <Label htmlFor="student-name">Student Name</Label>
                      <Input id="student-name" placeholder="Priya Sharma" />
                    </div>
                    <div>
                      <Label htmlFor="phone">WhatsApp Number</Label>
                      <Input id="phone" placeholder="+919876543210" />
                    </div>
                    <div>
                      <Label htmlFor="language">Preferred Language</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hi">Hindi</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="ru">Russian</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button type="submit" className="w-full">Add Parent</Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="bg-white rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Parent Name</TableHead>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Language</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Max Prilutskiy</TableCell>
                    <TableCell>Karl Prilutskiy</TableCell>
                    <TableCell>+919876543210</TableCell>
                    <TableCell>Russian</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">Edit</Button>
                      <Button variant="ghost" size="sm">Delete</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                  <TableCell>Sumit Saurabh</TableCell>
                  <TableCell>Karan Saurabh</TableCell>
                  <TableCell>+919876543210</TableCell>
                  <TableCell>Hindi</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">Edit</Button>
                    <Button variant="ghost" size="sm">Delete</Button>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Rajesh Kumar</TableCell>
                  <TableCell>Arjun Kumar</TableCell>
                  <TableCell>+919823456789</TableCell>
                  <TableCell>English</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">Edit</Button>
                    <Button variant="ghost" size="sm">Delete</Button>
                  </TableCell>
                </TableRow>
                  {/* Sample row - will be dynamic */}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Compose Tab */}
          <TabsContent value="compose" className="space-y-4">
            <div className="bg-white rounded-lg border p-6 space-y-6">
              <h2 className="text-xl font-semibold">Send Message</h2>

              <div className="space-y-4">
                {/* <div>
                  <Label>Send to</Label>
                  <RadioGroup defaultValue="all" className="mt-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="all" id="all" />
                      <Label htmlFor="all" className="font-normal">All Parents</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="individual" id="individual" />
                      <Label htmlFor="individual" className="font-normal">Select Individual Parents</Label>
                    </div>
                  </RadioGroup>
                </div> */}

                {/* TODO: Add multi-select for individual parents */}

                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message"
                    placeholder="Type your message here..."
                    className="min-h-[200px] mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="file">Attach PDF (Optional)</Label>
                  <Input 
                    id="file"
                    type="file"
                    accept=".pdf"
                    className="mt-2"
                  />
                </div>

                <Button className="w-full" size="lg" onClick={handleSendMessage}>
                  Send to Parents
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Inbox Tab */}
          <TabsContent value="inbox" className="space-y-4">
  <h2 className="text-xl font-semibold">Parent Messages</h2>
  
  <div className="bg-white rounded-lg border divide-y">
    {!messages || messages.length === 0 ? (
      <div className="p-8 text-center text-gray-400">
        <p>No messages yet</p>
      </div>
    ) : (
      messages?.map((msg) => (
        <div key={msg.id} className="p-4 hover:bg-gray-50">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="font-semibold">{msg?.parent?.name}</p>
              <p className="text-sm text-gray-500">
                {new Date(msg.createdAt).toLocaleString()}
              </p>
            </div>
            {/* <Button variant="outline" size="sm">Reply</Button> */}
          </div>
          <div className="space-y-2">
            <div>
              {/* <p className="text-xs text-gray-500">Original ({msg!.parent!.language}):</p> */}
              <p className="text-sm">{msg.originalText}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1 mt-5">Translation:</p>
              <p className="text-sm font-medium">{msg.translatedText}</p>
            </div>
          </div>
        </div>
      ))
    )}
  </div>
</TabsContent>
        </Tabs>
      </main>
    </div>
  )
}