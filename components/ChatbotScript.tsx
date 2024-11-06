import { useEffect } from 'react'

declare global {
  interface Window {
    ChatDialog: any;
    CHAT_DIALOG_CONFIG: any;
    loadChatDialog: () => void;
  }
}

const ChatbotScript = () => {
  useEffect(() => {
    // Configure chat dialog
    window.CHAT_DIALOG_CONFIG = {
      botName: 'Lamatic AI DocBot',
      suggestions: ['What is lamatic', 'What is AI', 'What is AI-powered chatbot'],
      policyUrl: 'https://lamatic.ai/docs/legal/privacy-policy',
      apiUrl: 'https://production-sandbox566-googledrivedocumentation671.lamatic.workers.dev',
      workflowId: '4dd10838-3c37-4720-b446-4d57b3476372',
      chatHeaderBgColor: 'black',
      imageUrl: 'https://owcowialbyyyniqocppr.supabase.co/storage/v1/object/public/icons/Lamatic.svg',
      // userMessageBgColor: '#E0F7FA',
      // userMessageTextColor: 'blue',
      // agentMessageBgColor: '#F1F8E9',
      // agentMessageTextColor: '#1B5E20',
      position: 'right',
      floatingButtonIcon: 'https://owcowialbyyyniqocppr.supabase.co/storage/v1/object/public/icons/Lamatic.svg',
      userId: '',
      errorMessage: 'Some error has taken place',
      context: 'your-context'
    };

    // Load the scripts sequentially
    const loadScript = (src: string) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    };

    const initChat = async () => {
      try {
        // Load scripts in sequence
        await loadScript('https://widget.lamatic.ai/chat/emojiPicker.js');
        await loadScript('https://widget.lamatic.ai/chat/index.js');
        
        // Initialize chat after scripts are loaded
        if (window.ChatDialog) {
          new window.ChatDialog(window.CHAT_DIALOG_CONFIG);
        }
      } catch (error) {
        console.error('Error loading chat scripts:', error);
      }
    };

    initChat();

    // Cleanup
    return () => {
      const scripts = [
        'https://widget.lamatic.ai/chat/emojiPicker.js',
        'https://widget.lamatic.ai/chat/index.js'
      ];
      scripts.forEach(src => {
        const script = document.querySelector(`script[src="${src}"]`);
        if (script) document.body.removeChild(script);
      });
    };
  }, []);

  return null;
}

export default ChatbotScript; 
