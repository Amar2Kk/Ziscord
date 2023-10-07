"use client";

import axios from "axios";
import { useState } from "react";
import { CheckIcon, Copy, RefreshCw } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { useOrigin } from "@/hooks/use-origin";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const InviteModal = () => {
    const { isOpen, onOpen, onClose, type, data } = useModal();
    const origin = useOrigin();

    const { server } = data;
    const isModalOpen = isOpen && type === "invite";
    const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

    const [copied, setCopied] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onCopy = () => {
        navigator.clipboard.writeText(inviteUrl);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 3000);
    };

    const onNew = async () => {
        try {
            setIsLoading(true);
            const response = await axios.patch(
                `/api/servers/${server?.id}/invite-code`
            );
            onOpen("invite", { server: response.data });
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="p-0 overflow-hidden text-black bg-white">
                <DialogHeader className="px-6 pt-8">
                    <DialogTitle className="text-2xl font-bold text-center">
                        Invite Friends
                    </DialogTitle>
                </DialogHeader>
                <div className="p-6">
                    <Label className="font-bold uppercase text-sx text-zinc-500 dark:text-secondary/70">
                        Server Invite Link
                    </Label>
                    <div className="flex items-center mt-2 gap-x-2">
                        <Input
                            disabled={isLoading}
                            className="text-black border-0 bg-zinc-300/50 focus-visible:ring-0 focus-visible: ring-offset-0"
                            value={inviteUrl}
                            readOnly
                        />
                        <Button
                            size="icon"
                            onClick={onCopy}
                            disabled={isLoading}
                        >
                            {copied ? (
                                <div>
                                    <CheckIcon className="w-5 h-5" color="green" />
                                </div>
                            ) : (
                                <Copy className="w-4 h-4" />
                            )}
                        </Button>
                    </div>
                    <Button
                        onClick={onNew}
                        disabled={isLoading}
                        size="sm"
                        variant="link"
                        className="mt-4 text-xs text-zinc-500"
                    >
                        Generate a new link
                        <RefreshCw className="w-4 h-4 ml-2" />
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
