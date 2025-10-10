import styled from 'styled-components'

export const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  overflow-y: auto;

  @media (max-width: 768px) {
    padding: 15px;
  }
`

export const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
`

export const Logo = styled.img`
  width: 80px;
  height: 80px;
  margin-right: 15px;
  border-radius: 50%;
`

export const Title = styled.h1`
  color: #f4d03f;
  font-size: 2.5rem;
  font-weight: 300;
  margin-bottom: 1rem;
  letter-spacing: 2px;
  text-align: center;
`

export const Subtitle = styled.p`
  color: #ffffff;
  font-size: 1.1rem;
  margin-bottom: 0.75rem;
  text-align: center;
  opacity: 0.8;
`

export const SmallText = styled.span`
  color: #ffffff;
  font-size: 0.9rem;
  text-align: center;
  opacity: 0.8;
`

export const SetupNotice = styled.div`
  background: rgba(255, 193, 7, 0.15);
  border: 2px solid #ffc107;
  border-radius: 8px;
  padding: 15px 20px;
  margin: 20px 0 30px 0;
  max-width: 800px;
  width: 100%;

  p {
    margin: 0;
    color: #ffc107;
    font-size: 0.95rem;
    line-height: 1.6;
    text-align: center;

    strong {
      color: #ffd54f;
      font-weight: 600;
    }

    a {
      color: #64b5f6;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.2s ease;

      &:hover {
        color: #90caf9;
        text-decoration: underline;
      }
    }
  }
`

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
  max-width: 600px;

  @media (max-width: 768px) {
    max-width: 100%;
    gap: 1rem;
  }
`

export const InputLabel = styled.label`
  color: #f4d03f;
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  align-self: flex-start;
`

export const CommandInput = styled.input`
  width: 100%;
  padding: 15px 20px;
  font-size: 1rem;
  border: 2px solid #444;
  border-radius: 8px;
  background: #333;
  color: #fff;
  outline: none;
  transition: all 0.3s ease;
  font-family: 'Courier New', monospace;

  &:focus {
    border-color: #f4d03f;
    box-shadow: 0 0 10px rgba(244, 208, 63, 0.3);
  }

  &::placeholder {
    color: #888;
  }
`

export const ExecuteButton = styled.button`
  background: #f4d03f;
  color: #1a1a1a;
  border: none;
  padding: 15px 40px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    background: #f7dc6f;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(244, 208, 63, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background: #666;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`

export const StatusMessage = styled.div<{
  $type: 'success' | 'error' | 'info'
}>`
  margin-top: 1rem;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 0.9rem;
  text-align: center;
  max-width: 100%;
  word-wrap: break-word;

  ${(props) => {
    switch (props.$type) {
      case 'success':
        return `
          background: rgba(46, 204, 113, 0.2);
          color: #2ecc71;
          border: 1px solid #2ecc71;
        `
      case 'error':
        return `
          background: rgba(231, 76, 60, 0.2);
          color: #e74c3c;
          border: 1px solid #e74c3c;
        `
      case 'info':
        return `
          background: rgba(52, 152, 219, 0.2);
          color: #3498db;
          border: 1px solid #3498db;
        `
    }
  }}
`

export const SupportedCommands = styled.div`
  margin-top: 2rem;
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  border: 1px solid #444;
  width: 100%;
  max-width: 800px;
`

export const SupportedCommandsTitle = styled.h3`
  color: #f4d03f;
  margin: 0 0 10px 0;
  font-size: 1rem;
`

export const CommandList = styled.ul`
  color: #ccc;
  margin: 0;
  padding-left: 20px;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;

  li {
    margin-bottom: 5px;
  }

  code {
    background: rgba(255, 255, 255, 0.1);
    padding: 2px 6px;
    border-radius: 3px;
    color: #f4d03f;
  }
`

export const PredefinedCommandsContainer = styled.div`
  margin-top: 2rem;
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  border: 1px solid #444;
`

export const PredefinedCommandsTitle = styled.h3`
  color: #f4d03f;
  margin: 0 0 15px 0;
  font-size: 1rem;
`

export const PredefinedButtonsRow = styled.div`
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  justify-content: center;
`

export const PredefinedCommandButton = styled.button`
  background: rgba(244, 208, 63, 0.2);
  color: #f4d03f;
  border: 1px solid #f4d03f;
  padding: 10px 20px;
  font-size: 0.9rem;
  font-weight: 500;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Courier New', monospace;
  min-width: 80px;

  &:hover {
    background: rgba(244, 208, 63, 0.3);
    transform: translateY(-1px);
    box-shadow: 0 3px 10px rgba(244, 208, 63, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background: rgba(102, 102, 102, 0.2);
    color: #666;
    border-color: #666;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`

export const SpecialCommandsContainer = styled.div`
  margin-top: 2rem;
  padding: 20px;
  background: rgba(52, 152, 219, 0.1);
  border-radius: 8px;
  border: 1px solid #3498db;
  width: 100%;
  max-width: 800px;
`

export const SpecialCommandsTitle = styled.h3`
  color: #3498db;
  margin: 0 0 15px 0;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 8px;

  &::before {
    content: '🔧';
    font-size: 1.2rem;
  }
`

export const SpecialDescription = styled.p`
  color: #ccc;
  font-size: 0.9rem;
  margin: 10px 0 20px 0;
  text-align: center;
  font-style: italic;
`

export const SpecialButtonsGrid = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-top: 1rem;

  @media (max-width: 768px) {
    gap: 10px;
  }
`

export const CommandFlowItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 300px;
`

export const FlowArrow = styled.div`
  color: #888;
  font-size: 1.2rem;
  margin: 8px 0;

  &::before {
    content: '↓';
  }
`

export const SpecialCommandButton = styled.button`
  background: rgba(52, 152, 219, 0.2);
  color: #3498db;
  border: 1px solid #3498db;
  padding: 12px 16px;
  font-size: 0.85rem;
  font-weight: 500;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  text-align: center;
  min-height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(52, 152, 219, 0.3);
    transform: translateY(-1px);
    box-shadow: 0 3px 10px rgba(52, 152, 219, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background: rgba(102, 102, 102, 0.2);
    color: #666;
    border-color: #666;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`

export const RecipeSwapContainer = styled.div<{ $enabled: boolean }>`
  margin-top: 2rem;
  padding: 20px;
  background: rgba(46, 204, 113, 0.1);
  border-radius: 8px;
  border: 1px solid #2ecc71;
  opacity: ${(props) => (props.$enabled ? 1 : 0.5)};
  transition: opacity 0.3s ease;
  width: 100%;
  max-width: 800px;
`

export const RecipeSwapTitle = styled.h3`
  color: #2ecc71;
  margin: 0 0 15px 0;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 8px;

  &::before {
    content: '🔄';
    font-size: 1.2rem;
  }
`

export const RecipeSwapButton = styled.button`
  background: rgba(46, 204, 113, 0.2);
  color: #2ecc71;
  border: 1px solid #2ecc71;
  padding: 15px 20px;
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  text-align: center;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover:not(:disabled) {
    background: rgba(46, 204, 113, 0.3);
    transform: translateY(-1px);
    box-shadow: 0 3px 10px rgba(46, 204, 113, 0.3);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    background: rgba(102, 102, 102, 0.2);
    color: #666;
    border-color: #666;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`

export const CsvInfoText = styled.div`
  margin-top: 1rem;
  padding: 10px 15px;
  font-size: 0.9rem;
  text-align: center;
  color: #a0a0a0;
  font-style: italic;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  border-left: 3px solid #4a9eff;
`

export const AuthenticationMessage = styled.div`
  margin-top: 1rem;
  padding: 15px 20px;
  border-radius: 6px;
  font-size: 1rem;
  text-align: center;
  font-weight: 500;
  background: rgba(46, 204, 113, 0.2);
  color: #2ecc71;
  border: 1px solid #2ecc71;
  animation: fadeIn 0.5s ease-in;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`

export const RecipeInputsContainer = styled.div`
  margin-top: 2rem;
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  border: 1px solid #444;
  width: 100%;
  max-width: 800px;
`

export const RecipeInputsTitle = styled.h3`
  color: #f4d03f;
  margin: 0 0 20px 0;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 8px;

  &::before {
    content: '⚙️';
    font-size: 1.2rem;
  }
`

export const MultiWeekCheckboxContainer = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer;
  font-size: 1.1rem;
  color: #4a9eff;
  font-weight: 500;
  padding: 12px 15px;
  background: rgba(74, 158, 255, 0.1);
  border-radius: 8px;
  border: 2px solid transparent;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(74, 158, 255, 0.15);
    border-color: rgba(74, 158, 255, 0.3);
  }

  input[type='checkbox'] {
    width: 20px;
    height: 20px;
    margin-right: 12px;
    cursor: pointer;
    accent-color: #4a9eff;
  }
`

export const InputsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 15px;
  }
`

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const InputGroupLabel = styled.label`
  color: #f4d03f;
  font-size: 0.9rem;
  font-weight: 500;
`

export const RecipeInput = styled.input`
  padding: 10px 12px;
  font-size: 0.9rem;
  border: 2px solid #444;
  border-radius: 6px;
  background: #333;
  color: #fff;
  outline: none;
  transition: all 0.3s ease;
  font-family: 'Courier New', monospace;

  &:focus {
    border-color: #f4d03f;
    box-shadow: 0 0 8px rgba(244, 208, 63, 0.3);
  }

  &::placeholder {
    color: #888;
    font-style: italic;
  }
`
