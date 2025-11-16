import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

type ServiceType = 'followers' | 'viewers' | 'views';

interface Plan {
  id: string;
  name: string;
  amount: number;
  price: number;
  popular?: boolean;
}

const plans: Record<ServiceType, Plan[]> = {
  followers: [
    { id: 'f1', name: 'Старт', amount: 100, price: 299 },
    { id: 'f2', name: 'Рост', amount: 500, price: 1199, popular: true },
    { id: 'f3', name: 'Про', amount: 1000, price: 2199 },
    { id: 'f4', name: 'Мега', amount: 5000, price: 9999 },
  ],
  viewers: [
    { id: 'v1', name: 'Старт', amount: 50, price: 499 },
    { id: 'v2', name: 'Рост', amount: 200, price: 1599, popular: true },
    { id: 'v3', name: 'Про', amount: 500, price: 3499 },
    { id: 'v4', name: 'Мега', amount: 1000, price: 6299 },
  ],
  views: [
    { id: 'w1', name: 'Старт', amount: 1000, price: 199 },
    { id: 'w2', name: 'Рост', amount: 5000, price: 799, popular: true },
    { id: 'w3', name: 'Про', amount: 10000, price: 1399 },
    { id: 'w4', name: 'Мега', amount: 50000, price: 5999 },
  ],
};

const Index = () => {
  const [selectedService, setSelectedService] = useState<ServiceType>('followers');
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [twitchUrl, setTwitchUrl] = useState('');
  const [currency, setCurrency] = useState('RUB');
  const [step, setStep] = useState<'service' | 'plan' | 'details' | 'payment'>('service');

  const handleServiceSelect = (service: ServiceType) => {
    setSelectedService(service);
    setSelectedPlan('');
    setStep('plan');
  };

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    setStep('details');
  };

  const handlePayment = () => {
    if (!twitchUrl.includes('twitch.tv')) {
      toast.error('Укажите корректный URL Twitch канала');
      return;
    }
    toast.success('Переход к оплате через epaycore...');
  };

  const selectedPlanData = plans[selectedService].find(p => p.id === selectedPlan);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10">
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
            <Icon name="TrendingUp" size={28} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Twitch Boost Bot
          </h1>
        </div>

        {step === 'service' && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Выбери услугу</h2>
              <p className="text-muted-foreground">Прокачай свой Twitch канал</p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <Card
                className="p-6 hover:border-primary transition-all cursor-pointer hover:scale-105 bg-card/50 backdrop-blur"
                onClick={() => handleServiceSelect('followers')}
              >
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                    <Icon name="Users" size={32} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Подписчики</h3>
                    <p className="text-sm text-muted-foreground">Увеличь базу фолловеров</p>
                  </div>
                </div>
              </Card>

              <Card
                className="p-6 hover:border-secondary transition-all cursor-pointer hover:scale-105 bg-card/50 backdrop-blur"
                onClick={() => handleServiceSelect('viewers')}
              >
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center">
                    <Icon name="Eye" size={32} className="text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Зрители</h3>
                    <p className="text-sm text-muted-foreground">Онлайн на трансляции</p>
                  </div>
                </div>
              </Card>

              <Card
                className="p-6 hover:border-accent transition-all cursor-pointer hover:scale-105 bg-card/50 backdrop-blur"
                onClick={() => handleServiceSelect('views')}
              >
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center">
                    <Icon name="Play" size={32} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Просмотры</h3>
                    <p className="text-sm text-muted-foreground">Накрутка VOD</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {step === 'plan' && (
          <div className="space-y-6 animate-fade-in">
            <Button
              variant="ghost"
              onClick={() => setStep('service')}
              className="mb-4"
            >
              <Icon name="ArrowLeft" size={20} />
              <span className="ml-2">Назад</span>
            </Button>

            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Выбери тариф</h2>
              <p className="text-muted-foreground">
                {selectedService === 'followers' && 'Подписчики на канал'}
                {selectedService === 'viewers' && 'Зрители на стрим'}
                {selectedService === 'views' && 'Просмотры видео'}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {plans[selectedService].map((plan) => (
                <Card
                  key={plan.id}
                  className={`p-6 cursor-pointer transition-all hover:scale-105 relative ${
                    plan.popular ? 'border-2 border-primary' : ''
                  }`}
                  onClick={() => handlePlanSelect(plan.id)}
                >
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-secondary">
                      🔥 Популярный
                    </Badge>
                  )}
                  <div className="text-center space-y-4">
                    <h3 className="text-2xl font-bold">{plan.name}</h3>
                    <div>
                      <div className="text-4xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        {plan.amount.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {selectedService === 'followers' && 'подписчиков'}
                        {selectedService === 'viewers' && 'зрителей'}
                        {selectedService === 'views' && 'просмотров'}
                      </div>
                    </div>
                    <div className="text-3xl font-bold">
                      {plan.price} ₽
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {step === 'details' && selectedPlanData && (
          <div className="space-y-6 animate-fade-in">
            <Button
              variant="ghost"
              onClick={() => setStep('plan')}
              className="mb-4"
            >
              <Icon name="ArrowLeft" size={20} />
              <span className="ml-2">Назад</span>
            </Button>

            <Card className="p-6 bg-card/50 backdrop-blur">
              <h2 className="text-2xl font-bold mb-6">Детали заказа</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                  <span className="text-muted-foreground">Услуга</span>
                  <span className="font-semibold">
                    {selectedService === 'followers' && '👥 Подписчики'}
                    {selectedService === 'viewers' && '👁️ Зрители'}
                    {selectedService === 'views' && '▶️ Просмотры'}
                  </span>
                </div>

                <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                  <span className="text-muted-foreground">Тариф</span>
                  <span className="font-semibold">{selectedPlanData.name} - {selectedPlanData.amount.toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">URL Twitch канала</label>
                  <Input
                    placeholder="https://twitch.tv/your_channel"
                    value={twitchUrl}
                    onChange={(e) => setTwitchUrl(e.target.value)}
                    className="bg-background"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Валюта оплаты</label>
                  <Select value={currency} onValueChange={setCurrency}>
                    <SelectTrigger className="bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="RUB">🇷🇺 RUB - Российский рубль</SelectItem>
                      <SelectItem value="USD">🇺🇸 USD - Доллар США</SelectItem>
                      <SelectItem value="EUR">🇪🇺 EUR - Евро</SelectItem>
                      <SelectItem value="UAH">🇺🇦 UAH - Гривна</SelectItem>
                      <SelectItem value="KZT">🇰🇿 KZT - Тенге</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xl font-bold">Итого:</span>
                    <span className="text-3xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      {selectedPlanData.price} ₽
                    </span>
                  </div>

                  <Button
                    className="w-full h-14 text-lg font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%] hover:bg-[position:100%_0] transition-all duration-500"
                    onClick={handlePayment}
                  >
                    <Icon name="CreditCard" size={24} />
                    <span className="ml-2">Перейти к оплате</span>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground bg-card/30 backdrop-blur px-4 py-2 rounded-full">
            <Icon name="Shield" size={16} />
            <span>Безопасная оплата через epaycore</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
