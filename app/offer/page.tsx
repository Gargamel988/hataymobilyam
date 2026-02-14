"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
    Upload,
    CheckCircle2,
    Store,
    Users,
    ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function OfferPage() {
    const [selectedWorkshop, setSelectedWorkshop] = useState("all");

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8 md:py-12 max-w-5xl">

                {/* Header */}
                <div className="mb-8 md:mb-12 text-center md:text-left">
                    <h1 className="text-3xl md:text-4xl font-extrabold mb-3 tracking-tight text-amber-950">
                        Teklif Al ve İletişim
                    </h1>
                    <p className="text-amber-800/80 max-w-2xl text-lg">
                        Hayalinizdeki mobilya için Hataylı ustalarımızdan fiyat teklifi alın.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

                    {/* LEFT SIDEBAR: Steps Navigation (Sticky on Desktop) */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-24 space-y-2">
                            <div className="p-4 bg-white rounded-xl border border-amber-100 shadow-sm flex items-center gap-4 text-amber-700 font-bold ring-1 ring-amber-200 transition-all">
                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-600 text-white font-bold text-sm shadow-md">1</div>
                                <span>Tasarım ve Görsel</span>
                            </div>
                            <div className="p-4 rounded-xl flex items-center gap-4 text-stone-500 hover:bg-stone-50 transition-colors cursor-default">
                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-stone-200 text-stone-600 font-bold text-sm">2</div>
                                <span>Detaylar ve Malzeme</span>
                            </div>
                            <div className="p-4 rounded-xl flex items-center gap-4 text-stone-500 hover:bg-stone-50 transition-colors cursor-default">
                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-stone-200 text-stone-600 font-bold text-sm">3</div>
                                <span>Atölye Seçimi</span>
                            </div>
                        </div>
                    </div>

                    {/* CENTER: Main Form */}
                    <div className="lg:col-span-8 space-y-12">

                        {/* SECTION 1: Upload */}
                        <div className="space-y-6 scroll-mt-24" id="step-1">
                            <h2 className="text-2xl font-bold flex items-center gap-3 text-amber-900">
                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-600 text-white font-bold text-sm lg:hidden">1</div>
                                Tasarımınızı Yükleyin
                            </h2>

                            <div className="border-2 border-dashed border-amber-200 rounded-2xl p-10 md:p-16 text-center bg-stone-50/50 hover:bg-amber-50/30 hover:border-amber-400 transition-all cursor-pointer group">
                                <div className="bg-amber-100/50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-sm">
                                    <Upload className="h-10 w-10 text-amber-600" />
                                </div>
                                <h3 className="text-lg font-bold text-amber-900 mb-2">Fotoğraf veya Eskiz Yükle</h3>
                                <p className="text-stone-500 text-sm max-w-xs mx-auto mb-8 leading-relaxed">
                                    İlham aldığınız bir görseli veya kendi çiziminizi buraya sürükleyin.
                                </p>
                                <Button className="px-8 h-12 bg-amber-600 hover:bg-amber-700 text-white font-semibold shadow-amber-200/50 shadow-lg text-base rounded-full">
                                    Dosya Seç
                                </Button>
                            </div>
                        </div>

                        {/* SECTION 2: Details */}
                        <div className="space-y-6 scroll-mt-24" id="step-2">
                            <h2 className="text-2xl font-bold flex items-center gap-3 text-amber-900">
                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-600 text-white font-bold text-sm lg:hidden">2</div>
                                Detaylar ve Malzeme
                            </h2>

                            <div className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label className="text-amber-900 font-semibold">Mobilya Tipi</Label>
                                        <Select>
                                            <SelectTrigger className="bg-white border-stone-200 h-12 focus:ring-amber-500 rounded-lg">
                                                <SelectValue placeholder="Seçiniz" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="yemek">Yemek Masası</SelectItem>
                                                <SelectItem value="mutfak">Mutfak Dolabı</SelectItem>
                                                <SelectItem value="yatak">Yatak Odası</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-amber-900 font-semibold">Ahşap Türü</Label>
                                        <Select>
                                            <SelectTrigger className="bg-white border-stone-200 h-12 focus:ring-amber-500 rounded-lg">
                                                <SelectValue placeholder="Seçiniz" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="sedir">Hatay Sediri</SelectItem>
                                                <SelectItem value="ceviz">Ceviz</SelectItem>
                                                <SelectItem value="mese">Meşe</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-amber-900 font-semibold">Boyutlar (En x Boy x Derinlik)</Label>
                                    <div className="grid grid-cols-3 gap-4">
                                        <Input className="h-12 bg-white border-stone-200 focus:border-amber-500 focus:ring-amber-500 rounded-lg" placeholder="120 cm" />
                                        <Input className="h-12 bg-white border-stone-200 focus:border-amber-500 focus:ring-amber-500 rounded-lg" placeholder="80 cm" />
                                        <Input className="h-12 bg-white border-stone-200 focus:border-amber-500 focus:ring-amber-500 rounded-lg" placeholder="60 cm" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-amber-900 font-semibold">Ek Notlar</Label>
                                    <Textarea
                                        className="min-h-[120px] bg-white border-stone-200 focus:border-amber-500 focus:ring-amber-500 text-base resize-none p-4 rounded-lg shadow-sm"
                                        placeholder="Ustanın bilmesini istediğiniz özel detaylar..."
                                    />
                                </div>
                            </div>
                        </div>

                        {/* SECTION 3: Workshop Selection */}
                        <div className="space-y-6 scroll-mt-24" id="step-3">
                            <h2 className="text-2xl font-bold flex items-center gap-3 text-amber-900">
                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-600 text-white font-bold text-sm lg:hidden">3</div>
                                Atölye Seçimi
                            </h2>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div
                                    className={cn(
                                        "border-2 rounded-xl p-5 flex items-center gap-4 cursor-pointer transition-all relative overflow-hidden",
                                        selectedWorkshop === "all" ? "bg-amber-50/50 border-amber-500 shadow-md ring-1 ring-amber-200" : "bg-white border-stone-200 hover:border-amber-300 hover:bg-stone-50"
                                    )}
                                    onClick={() => setSelectedWorkshop("all")}
                                >
                                    <div className="bg-amber-100 p-3 rounded-xl shrink-0 text-amber-700">
                                        <Users className="h-6 w-6" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-bold text-amber-900">Hepsine Gönder</div>
                                        <div className="text-xs text-stone-500">En hızlı ve rekabetçi teklifleri al</div>
                                    </div>
                                    {selectedWorkshop === "all" && <CheckCircle2 className="h-6 w-6 text-green-600 absolute top-4 right-4" />}
                                </div>

                                <div
                                    className={cn(
                                        "border-2 rounded-xl p-5 flex items-center gap-4 cursor-pointer transition-all relative overflow-hidden",
                                        selectedWorkshop === "specific" ? "bg-amber-50/50 border-amber-500 shadow-md ring-1 ring-amber-200" : "bg-white border-stone-200 hover:border-amber-300 hover:bg-stone-50"
                                    )}
                                    onClick={() => setSelectedWorkshop("specific")}
                                >
                                    <div className="bg-orange-100 p-3 rounded-xl shrink-0 text-orange-700">
                                        <Store className="h-6 w-6" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-bold text-amber-900">Asi Ahşap Sanat</div>
                                        <div className="text-xs text-stone-500">Geleneksel Hatay Oyma</div>
                                    </div>
                                    {selectedWorkshop === "specific" && <CheckCircle2 className="h-6 w-6 text-green-600 absolute top-4 right-4" />}
                                </div>
                            </div>

                            <Button size="lg" className="w-full text-lg h-16 font-bold bg-amber-600 hover:bg-amber-700 text-white shadow-xl shadow-amber-900/10 rounded-xl hover:scale-[1.01] transition-all flex items-center justify-center gap-2 mt-4">
                                Teklif Talebi Gönder <ArrowRight className="h-5 w-5" />
                            </Button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
